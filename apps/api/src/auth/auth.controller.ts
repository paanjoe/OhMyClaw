import { Controller, Get, Post, Req, Res, UseGuards, Query } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { AuthService, type GoogleProfile } from './auth.service';
import { MODEL_IDS, CHANNEL_IDS } from 'shared';
import type { ModelId, ChannelId } from 'shared';

const FRONTEND_URL = process.env.FRONTEND_URL ?? 'http://localhost:3000';
const COOKIE_NAME = 'auth';
const PREF_COOKIE = 'deploy_prefs';
const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  maxAge: 7 * 24 * 60 * 60 * 1000,
  path: '/',
};

@Controller('auth')
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  @Get('google')
  googleAuthWithPrefs(
    @Query('model') model: string,
    @Query('channel') channel: string,
    @Res() res: Response,
  ) {
    if (model && channel) {
      res.cookie(PREF_COOKIE, `${model},${channel}`, {
        httpOnly: true,
        maxAge: 60 * 1000,
        path: '/',
        sameSite: 'lax',
      });
    }
    res.redirect(302, '/auth/google/start');
  }

  @Get('google/start')
  @UseGuards(AuthGuard('google'))
  googleStart() {
    // Guard redirects to Google
  }

  @Get('callback')
  @UseGuards(AuthGuard('google'))
  async googleCallback(
    @Req() req: Request & { user: GoogleProfile },
    @Res() res: Response,
  ) {
    const profile = req.user as GoogleProfile;
    const user = await this.auth.findOrCreateUser(profile);

    const prefs = req.cookies?.[PREF_COOKIE]?.split(',');
    if (prefs?.length === 2) {
      const modelId = prefs[0] as ModelId;
      const channelId = prefs[1] as ChannelId;
      if (MODEL_IDS.includes(modelId) && CHANNEL_IDS.includes(channelId)) {
        await this.auth.createDeployment(user.id, modelId, channelId);
      }
      res.clearCookie(PREF_COOKIE, { path: '/' });
    }

    const token = this.auth.signToken({ sub: user.id, email: user.email });
    res.cookie(COOKIE_NAME, token, COOKIE_OPTIONS);
    res.redirect(302, FRONTEND_URL);
  }

  @Get('me')
  @UseGuards(AuthGuard('jwt-cookie'))
  async me(@Req() req: Request & { user: { id: string; email: string; name: string | null; avatarUrl: string | null } }) {
    return req.user;
  }

  @Post('logout')
  logout(@Res() res: Response) {
    res.clearCookie(COOKIE_NAME, { path: '/' });
    res.status(204).send();
  }
}
