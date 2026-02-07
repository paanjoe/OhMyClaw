import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { randomBytes } from 'crypto';
import type { ModelId } from 'shared';
import { ChatService } from '../chat/chat.service';

const TELEGRAM_API = 'https://api.telegram.org';

export type SetTelegramTokenResult =
  | { success: true; deployment: Awaited<ReturnType<DeploymentsService['findOne']>> }
  | { success: false; reason: 'deployment_not_found' | 'invalid_token' | 'webhook_failed'; detail?: string };

@Injectable()
export class DeploymentsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly chat: ChatService,
  ) {}

  async findByUser(userId: string) {
    const list = await this.prisma.deployment.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        modelId: true,
        channelId: true,
        status: true,
        telegramUsername: true,
        createdAt: true,
      },
    });
    return list;
  }

  async findOne(id: string, userId: string) {
    const d = await this.prisma.deployment.findFirst({
      where: { id, userId },
      select: {
        id: true,
        modelId: true,
        channelId: true,
        status: true,
        telegramUsername: true,
        createdAt: true,
      },
    });
    return d;
  }

  async create(userId: string, modelId: string, channelId: string) {
    const deployment = await this.prisma.deployment.create({
      data: { userId, modelId, channelId, status: 'pending' },
      select: {
        id: true,
        modelId: true,
        channelId: true,
        status: true,
        createdAt: true,
      },
    });
    return deployment;
  }

  getAvailability() {
    return { available: true };
  }

  /** Validate token with Telegram getMe, set webhook, save to deployment. */
  async setTelegramToken(
    deploymentId: string,
    userId: string,
    token: string,
    webhookBaseUrl: string,
  ): Promise<SetTelegramTokenResult> {
    const deployment = await this.prisma.deployment.findFirst({
      where: { id: deploymentId, userId },
    });
    if (!deployment) return { success: false, reason: 'deployment_not_found' };

    const trimmed = token.trim();
    const getMeRes = await fetch(`${TELEGRAM_API}/bot${trimmed}/getMe`);
    const getMeData = (await getMeRes.json()) as { ok: boolean; result?: { username?: string }; description?: string };
    if (!getMeRes.ok || !getMeData.ok || !getMeData.result) {
      return { success: false, reason: 'invalid_token', detail: getMeData.description };
    }

    const secret = randomBytes(32).toString('hex');
    const webhookUrl = `${webhookBaseUrl}/telegram/webhook/${deploymentId}`;
    const setWebhookRes = await fetch(`${TELEGRAM_API}/bot${trimmed}/setWebhook`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        url: webhookUrl,
        secret_token: secret,
      }),
    });
    const setWebhookData = (await setWebhookRes.json()) as { ok: boolean; description?: string };
    if (!setWebhookRes.ok || !setWebhookData.ok) {
      const detail = setWebhookData.description ?? 'Webhook URL must be HTTPS. For local dev, use a tunnel (e.g. ngrok).';
      return { success: false, reason: 'webhook_failed', detail };
    }

    await this.prisma.deployment.update({
      where: { id: deploymentId },
      data: {
        telegramBotToken: trimmed,
        telegramWebhookSecret: secret,
        telegramUsername: getMeData.result.username ?? null,
        status: 'bot_connected',
      },
    });

    const d = await this.findOne(deploymentId, userId);
    return d ? { success: true, deployment: d } : { success: false, reason: 'deployment_not_found' };
  }

  /** Handle incoming Telegram update. Verify secret, on /start set user_confirmed. */
  async handleTelegramWebhook(
    deploymentId: string,
    secretToken: string | undefined,
    body: unknown,
  ): Promise<boolean> {
    const deployment = await this.prisma.deployment.findUnique({
      where: { id: deploymentId },
    });
    if (!deployment?.telegramWebhookSecret) return false;
    if (deployment.telegramWebhookSecret !== secretToken) return false;

    const update = body as {
      message?: {
        text?: string;
        from?: { id: number; username?: string };
        chat?: { id: number };
      };
    };
    const text = update.message?.text?.trim();
    const fromId = update.message?.from?.id;
    const chatId = update.message?.chat?.id;
    const token = deployment.telegramBotToken;

    if (text === '/start' && fromId != null) {
      await this.prisma.deployment.update({
        where: { id: deploymentId },
        data: {
          status: 'user_confirmed',
          telegramUserId: String(fromId),
        },
      });
      if (token && chatId) {
        await this.sendTelegramMessage(
          token,
          chatId,
          "You're connected. Your OpenClaw assistant is ready. Send me any message and I'll reply.",
        );
      }
    } else if (text && token && chatId) {
      // Reply to every other message with AI (or placeholder)
      const reply = await this.chat.getReply(
        deployment.modelId as ModelId,
        text,
      );
      await this.sendTelegramMessage(token, chatId, reply);
    }

    return true;
  }

  private async sendTelegramMessage(
    botToken: string,
    chatId: number,
    text: string,
  ): Promise<void> {
    await fetch(`${TELEGRAM_API}/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text }),
    }).catch((e) => console.warn('Telegram sendMessage failed:', e));
  }
}
