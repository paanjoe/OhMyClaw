import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Req,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { DeploymentsService } from './deployments.service';
import { Request } from 'express';

@Controller('deployments')
export class DeploymentsController {
  constructor(private readonly deployments: DeploymentsService) {}

  @Get()
  @UseGuards(AuthGuard('jwt-cookie'))
  async list(@Req() req: Request & { user: { id: string } }) {
    return this.deployments.findByUser(req.user.id);
  }

  @Get('availability')
  availability() {
    return this.deployments.getAvailability();
  }

  @Post()
  @UseGuards(AuthGuard('jwt-cookie'))
  async create(
    @Req() req: Request & { user: { id: string } },
    @Body() body: { modelId: string; channelId: string },
  ) {
    const { modelId, channelId } = body;
    if (!modelId || !channelId) throw new BadRequestException('modelId and channelId required');
    return this.deployments.create(req.user.id, modelId, channelId);
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt-cookie'))
  async one(
    @Req() req: Request & { user: { id: string } },
    @Param('id') id: string,
  ) {
    const d = await this.deployments.findOne(id, req.user.id);
    if (!d) throw new NotFoundException();
    return d;
  }

  @Post(':id/telegram')
  @UseGuards(AuthGuard('jwt-cookie'))
  async setTelegram(
    @Req() req: Request & { user: { id: string } },
    @Param('id') id: string,
    @Body() body: { token: string },
  ) {
    const token = body?.token?.trim();
    if (!token) throw new BadRequestException('token required');
    const baseUrl = process.env.API_PUBLIC_URL || process.env.FRONTEND_URL?.replace('3000', '3001') || 'http://localhost:3001';
    const result = await this.deployments.setTelegramToken(id, req.user.id, token, baseUrl);
    if (!result.success) {
      const message = result.detail ?? (result.reason === 'invalid_token' ? 'Invalid Telegram bot token. Check the token from BotFather.' : result.reason === 'webhook_failed' ? 'Could not set webhook. Use an HTTPS URL (e.g. ngrok for local dev).' : 'Deployment not found.');
      throw new BadRequestException(message);
    }
    return result.deployment;
  }
}
