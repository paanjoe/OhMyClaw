import { Controller, Post, Param, Req, Headers } from '@nestjs/common';
import { Request } from 'express';
import { DeploymentsService } from '../deployments/deployments.service';

@Controller('telegram')
export class TelegramController {
  constructor(private readonly deployments: DeploymentsService) {}

  @Post('webhook/:deploymentId')
  async webhook(
    @Param('deploymentId') deploymentId: string,
    @Headers('x-telegram-bot-api-secret-token') secretToken: string,
    @Req() req: Request,
  ) {
    const body = req.body as unknown;
    await this.deployments.handleTelegramWebhook(
      deploymentId,
      secretToken,
      body,
    );
    return { ok: true };
  }
}
