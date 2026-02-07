import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import type { ModelId, ChannelId } from 'shared';

export interface GoogleProfile {
  id: string;
  email: string;
  name?: string;
  picture?: string;
}

export interface JwtPayload {
  sub: string;
  email: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
  ) {}

  async findOrCreateUser(profile: GoogleProfile) {
    const user = await this.prisma.user.upsert({
      where: { email: profile.email },
      create: {
        email: profile.email,
        name: profile.name ?? null,
        avatarUrl: profile.picture ?? null,
      },
      update: {
        name: profile.name ?? null,
        avatarUrl: profile.picture ?? null,
      },
    });
    return user;
  }

  async createDeployment(
    userId: string,
    modelId: ModelId,
    channelId: ChannelId,
  ) {
    return this.prisma.deployment.create({
      data: { userId, modelId, channelId, status: 'pending' },
    });
  }

  signToken(payload: JwtPayload): string {
    return this.jwt.sign(payload, {
      expiresIn: process.env.JWT_EXPIRES_IN ?? '7d',
    });
  }

  async validateUserId(sub: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: sub },
    });
    return user ?? null;
  }
}
