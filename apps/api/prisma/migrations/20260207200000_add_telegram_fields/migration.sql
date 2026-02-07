-- AlterTable
ALTER TABLE "deployments" ADD COLUMN "telegramBotToken" TEXT,
ADD COLUMN "telegramWebhookSecret" TEXT,
ADD COLUMN "telegramUserId" TEXT,
ADD COLUMN "telegramUsername" TEXT;
