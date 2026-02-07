import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { ModelId } from 'shared';

const ANTHROPIC_API = 'https://api.anthropic.com/v1/messages';

/** Map our model IDs to Anthropic model names (Claude only for now). */
const MODEL_TO_ANTHROPIC: Partial<Record<ModelId, string>> = {
  'claude-opus-4.5': 'claude-3-5-sonnet-20241022',
  'gpt-5.2': undefined,
  'gemini-3-flash': undefined,
};

@Injectable()
export class ChatService {
  constructor(private readonly config: ConfigService) {}

  /**
   * Get an AI reply for the user message. Uses Anthropic for Claude models;
   * other models or missing key return a placeholder.
   */
  async getReply(modelId: ModelId, userMessage: string): Promise<string> {
    const apiKey = this.config.get<string>('ANTHROPIC_API_KEY');
    const anthropicModel = MODEL_TO_ANTHROPIC[modelId];

    if (apiKey && anthropicModel) {
      try {
        const res = await fetch(ANTHROPIC_API, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': apiKey,
            'anthropic-version': '2023-06-01',
          },
          body: JSON.stringify({
            model: anthropicModel,
            max_tokens: 1024,
            messages: [{ role: 'user', content: userMessage }],
          }),
        });
        if (!res.ok) {
          const err = (await res.json()) as { error?: { message?: string } };
          throw new Error(err?.error?.message ?? res.statusText);
        }
        const data = (await res.json()) as {
          content?: Array<{ type: string; text?: string }>;
        };
        const text = data.content?.[0]?.text?.trim();
        if (text) return text;
      } catch (e) {
        console.warn('ChatService.getReply error:', e);
        return `I couldn’t process that right now (${e instanceof Error ? e.message : 'error'}). Try again in a moment.`;
      }
    }

    return "You’re connected to your OpenClaw assistant. To get AI replies, add ANTHROPIC_API_KEY to your API .env (see .env.example). For now, I’m here and ready once the key is set.";
  }
}
