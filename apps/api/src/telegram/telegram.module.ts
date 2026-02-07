import { Module } from '@nestjs/common';
import { DeploymentsModule } from '../deployments/deployments.module';
import { TelegramController } from './telegram.controller';

@Module({
  imports: [DeploymentsModule],
  controllers: [TelegramController],
})
export class TelegramModule {}
