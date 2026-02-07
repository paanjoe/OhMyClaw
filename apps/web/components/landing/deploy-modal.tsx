"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bot, Sparkles, LogOut, Zap, type LucideIcon } from "lucide-react";
import type { ModelId, ChannelId } from "shared";
import { cn } from "@/lib/utils";
import { COPY } from "@/lib/copy";
import { TelegramIcon, DiscordIcon, WhatsAppIcon } from "@/components/icons";

const MODELS: { id: ModelId; label: string; icon: LucideIcon }[] = [
  { id: "claude-opus-4.5", label: "Claude Opus 4.5", icon: Sparkles },
  { id: "gpt-5.2", label: "GPT-5.2", icon: Bot },
  { id: "gemini-3-flash", label: "Gemini 3 Flash", icon: Sparkles },
];

const CHANNELS: {
  id: ChannelId;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  comingSoon?: boolean;
}[] = [
  { id: "telegram", label: "Telegram", icon: TelegramIcon },
  { id: "discord", label: "Discord", icon: DiscordIcon },
  { id: "whatsapp", label: "WhatsApp", icon: WhatsAppIcon, comingSoon: true },
];

interface User {
  id: string;
  email: string;
  name: string | null;
  avatarUrl: string | null;
}

interface DeployModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: User;
  model: ModelId;
  channel: ChannelId;
  serversLeft?: number;
  onDeployOpenClaw: () => void;
}

export function DeployModal({
  open,
  onOpenChange,
  user,
  model,
  channel,
  serversLeft = 11,
  onDeployOpenClaw,
}: DeployModalProps) {
  const channelLabel = CHANNELS.find((c) => c.id === channel)?.label ?? channel;
  const connectHint = COPY.deploy.connectChannelToContinue.replace(
    "{channel}",
    channelLabel
  );
  const limitedText = COPY.deploy.limitedServers.replace("{count}", String(serversLeft));

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg" showClose={true}>
        <DialogHeader>
          <DialogTitle>{COPY.deploy.deployOpenClaw}</DialogTitle>
        </DialogHeader>
        <div className="space-y-5 pt-2">
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground">
              {COPY.deploy.modelQuestion}
            </h3>
            <div className="grid grid-cols-3 gap-2">
              {MODELS.map((m) => (
                <Card
                  key={m.id}
                  className={cn(
                    "transition-all",
                    model === m.id &&
                      "border-primary ring-2 ring-primary/20 bg-primary/5"
                  )}
                >
                  <CardContent className="flex flex-col items-center gap-1.5 p-3">
                    <m.icon className="h-6 w-6 text-primary" />
                    <span className="text-xs font-medium">{m.label}</span>
                    {model === m.id && (
                      <span className="text-primary" aria-hidden>✓</span>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground">
              {COPY.deploy.channelQuestion}
            </h3>
            <div className="grid grid-cols-3 gap-2">
              {CHANNELS.map((c) => (
                <Card
                  key={c.id}
                  className={cn(
                    "transition-all",
                    channel === c.id &&
                      "border-primary ring-2 ring-primary/20 bg-primary/5"
                  )}
                >
                  <CardContent className="relative flex flex-col items-center gap-1.5 p-3">
                    {c.comingSoon && (
                      <Badge
                        variant="secondary"
                        className="absolute right-1 top-1 text-[9px]"
                      >
                        {COPY.deploy.comingSoon}
                      </Badge>
                    )}
                    <c.icon className="h-6 w-6 shrink-0 text-primary" />
                    <span className="text-xs font-medium">{c.label}</span>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-lg border border-border/50 bg-muted/30 px-3 py-2">
            {user.avatarUrl ? (
              <img
                src={user.avatarUrl}
                alt=""
                className="h-10 w-10 shrink-0 rounded-lg object-cover"
                width={40}
                height={40}
              />
            ) : (
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/20 text-sm font-medium text-primary">
                {(user.name || user.email).charAt(0).toUpperCase()}
              </span>
            )}
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-foreground">
                {user.name || user.email}
              </p>
              <p className="truncate text-xs text-muted-foreground">
                {user.email}
              </p>
            </div>
            <LogOut className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
          </div>
          <Button
            className="w-full gap-2"
            size="lg"
            onClick={onDeployOpenClaw}
          >
            <Zap className="h-4 w-4" />
            {COPY.deploy.deployOpenClaw}
          </Button>
          <div className="space-y-1 text-center text-sm text-muted-foreground">
            <p>
              <span className="font-medium text-foreground">{connectHint}</span>{" "}
              {COPY.deploy.addOtherChannelsLater}
            </p>
            <p className="text-destructive font-medium">{limitedText}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
