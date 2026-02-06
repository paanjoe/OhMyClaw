"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Bot,
  MessageCircle,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import type { ModelId, ChannelId } from "shared";
import { cn } from "@/lib/utils";

const MODELS: { id: ModelId; label: string; icon: LucideIcon }[] = [
  { id: "claude-opus-4.5", label: "Claude Opus 4.5", icon: Sparkles },
  { id: "gpt-5.2", label: "GPT-5.2", icon: Bot },
  { id: "gemini-3-flash", label: "Gemini 3 Flash", icon: Sparkles },
];

const CHANNELS: {
  id: ChannelId;
  label: string;
  icon: LucideIcon;
  comingSoon?: boolean;
}[] = [
  { id: "telegram", label: "Telegram", icon: MessageCircle },
  { id: "discord", label: "Discord", icon: MessageCircle },
  { id: "whatsapp", label: "WhatsApp", icon: MessageCircle, comingSoon: true },
];

export function DeployBlock() {
  const [model, setModel] = useState<ModelId | null>(null);
  const [channel, setChannel] = useState<ChannelId | null>(null);

  const apiBase =
    process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";
  const authUrl = `${apiBase}/auth/google?model=${model ?? ""}&channel=${channel ?? ""}`;

  return (
    <div className="mx-auto max-w-3xl space-y-10">
      {/* Subtitle + Sign in with Google — right under the headline for easy click */}
      <div className="flex flex-col items-center gap-4 pt-4">
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
          Avoid all technical complexity and one-click deploy your own 24/7
          active OpenClaw instance under 1 minute.
        </p>
        <div className="flex flex-col items-center gap-2">
          <Button
            size="lg"
            className="min-w-[260px] gap-2 font-heading text-base sm:min-w-[280px]"
            asChild
          >
            <a href={authUrl}>
              <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden>
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Sign in with Google
            </a>
          </Button>
          <p className="text-xs text-muted-foreground">
            Sign in to deploy your AI assistant and connect your channels.
          </p>
          <p className="text-xs text-muted-foreground/80">
            Checking availability…
          </p>
        </div>
      </div>

      <div className="space-y-4 text-center">
        <h2 className="font-heading text-xl font-semibold tracking-tight text-muted-foreground">
          Which model do you want as default?
        </h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {MODELS.map((m) => (
            <Card
              key={m.id}
              className={cn(
                "cursor-pointer transition-all duration-200 hover:border-primary/50 hover:bg-card/80",
                model === m.id &&
                  "border-primary ring-2 ring-primary/20 bg-primary/5"
              )}
              onClick={() => setModel(m.id)}
            >
              <CardContent className="flex flex-col items-center gap-2 p-5">
                <m.icon className="h-8 w-8 text-primary" />
                <span className="font-heading text-sm font-medium">
                  {m.label}
                </span>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="space-y-4 text-center">
        <h2 className="font-heading text-xl font-semibold tracking-tight text-muted-foreground">
          Which channel do you want to use for sending messages?
        </h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {CHANNELS.map((c) => (
            <Card
              key={c.id}
              className={cn(
                "transition-all duration-200",
                !c.comingSoon && "cursor-pointer hover:border-primary/50 hover:bg-card/80",
                channel === c.id &&
                  !c.comingSoon &&
                  "border-primary ring-2 ring-primary/20 bg-primary/5"
              )}
              onClick={() => !c.comingSoon && setChannel(c.id)}
            >
              <CardContent className="relative flex flex-col items-center gap-2 p-5">
                {c.comingSoon && (
                  <Badge
                    variant="secondary"
                    className="absolute right-2 top-2 text-[10px]"
                  >
                    Coming soon
                  </Badge>
                )}
                <c.icon className="h-8 w-8 text-primary" />
                <span className="font-heading text-sm font-medium">
                  {c.label}
                </span>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
