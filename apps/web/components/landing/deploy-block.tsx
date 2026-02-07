"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bot, Sparkles, LogOut, type LucideIcon } from "lucide-react";
import type { ModelId, ChannelId } from "shared";
import { cn } from "@/lib/utils";
import { COPY } from "@/lib/copy";
import { TelegramIcon, DiscordIcon, WhatsAppIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { DeployModal } from "./deploy-modal";
import { ConnectTelegramModal } from "./connect-telegram-modal";
import { DeploymentFlow } from "./deployment-flow";

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

type FlowStep = "starting" | "confirm_user" | "success" | null;

interface DeploymentState {
  id: string;
  status: string;
  telegramUsername: string | null;
}

interface User {
  id: string;
  email: string;
  name: string | null;
  avatarUrl: string | null;
}

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

export function DeployBlock() {
  const [model, setModel] = useState<ModelId | null>(null);
  const [channel, setChannel] = useState<ChannelId | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [deployModalOpen, setDeployModalOpen] = useState(false);
  const [connectTelegramOpen, setConnectTelegramOpen] = useState(false);
  const [serversLeft, setServersLeft] = useState(11);
  const [deploymentId, setDeploymentId] = useState<string | null>(null);
  const [flowStep, setFlowStep] = useState<FlowStep>(null);
  const [currentDeployment, setCurrentDeployment] = useState<DeploymentState | null>(null);
  const [confirming, setConfirming] = useState(false);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    fetch(`${API_BASE}/auth/me`, { credentials: "include" })
      .then((r) => (r.ok ? r.json() : null))
      .then(setUser)
      .finally(() => setAuthLoading(false));
  }, []);

  useEffect(() => {
    fetch(`${API_BASE}/deployments/availability`)
      .then((r) => r.json())
      .then((data: { available?: boolean; count?: number }) => {
        if (typeof data.count === "number") setServersLeft(data.count);
      })
      .catch(() => {});
  }, []);

  const fetchDeployment = useCallback(
    (id: string) =>
      fetch(`${API_BASE}/deployments/${id}`, { credentials: "include" }).then((r) =>
        r.ok ? (r.json() as Promise<DeploymentState>) : null
      ),
    []
  );

  useEffect(() => {
    if (!deploymentId || !confirming) return;
    const tick = () => {
      fetchDeployment(deploymentId).then((d) => {
        if (d?.status === "user_confirmed") {
          setCurrentDeployment(d);
          setFlowStep("success");
          setConfirming(false);
          if (pollRef.current) {
            clearInterval(pollRef.current);
            pollRef.current = null;
          }
        }
      });
    };
    tick();
    pollRef.current = setInterval(tick, 2000);
    return () => {
      if (pollRef.current) clearInterval(pollRef.current);
    };
  }, [deploymentId, confirming, fetchDeployment]);

  const authUrl = `${API_BASE}/auth/google?model=${model ?? ""}&channel=${channel ?? ""}`;

  const handleSignOut = () => {
    fetch(`${API_BASE}/auth/logout`, { method: "POST", credentials: "include" }).then(() => {
      setUser(null);
      window.location.reload();
    });
  };

  const handleDeployOpenClaw = async () => {
    if (!user || !model || !channel) return;
    const res = await fetch(`${API_BASE}/deployments`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ modelId: model, channelId: channel }),
    });
    if (!res.ok) return;
    const d = (await res.json()) as { id: string; status: string; telegramUsername?: string | null };
    setDeploymentId(d.id);
    setCurrentDeployment({
      id: d.id,
      status: d.status,
      telegramUsername: d.telegramUsername ?? null,
    });
    setDeployModalOpen(false);
    if (channel === "telegram") setConnectTelegramOpen(true);
  };

  const handleTelegramSave = async (token: string) => {
    if (!deploymentId) throw new Error("No deployment");
    const maxAttempts = 3;
    const delayMs = 1000;
    let lastRes: Response | null = null;
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      const res = await fetch(
        `${API_BASE}/deployments/${deploymentId}/telegram`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        }
      );
      if (res.ok) {
        const d = (await res.json()) as DeploymentState;
        setCurrentDeployment(d);
        setConnectTelegramOpen(false);
        setFlowStep("starting");
        setTimeout(() => setFlowStep("confirm_user"), 1500);
        return;
      }
      lastRes = res;
      if (attempt < maxAttempts) {
        await new Promise((r) => setTimeout(r, delayMs));
      }
    }
    let message = "Connection failed. Check the token and try again.";
    if (lastRes) {
      try {
        const body = (await lastRes.json()) as { message?: string | string[] };
        const m = body?.message;
        message = Array.isArray(m) ? m[0] ?? message : m ?? message;
      } catch {
        // use default message
      }
    }
    throw new Error(message);
  };

  const handleConfirmSentMessage = () => {
    setConfirming(true);
  };

  const handleStartNewDeployment = () => {
    setDeploymentId(null);
    setFlowStep(null);
    setCurrentDeployment(null);
    setConfirming(false);
  };

  const inFlow = deploymentId && flowStep;

  if (inFlow) {
    return (
      <div className="mx-auto max-w-3xl space-y-10">
        <DeploymentFlow
          step={flowStep}
          confirming={confirming}
          botUsername={currentDeployment?.telegramUsername ?? null}
          onConfirm={handleConfirmSentMessage}
          onStartNew={handleStartNewDeployment}
        />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-10">
      {/* Subtitle + Sign in / signed-in state */}
      <div className="flex flex-col items-center gap-4 pt-4">
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
          {COPY.hero.subtitle}
        </p>
        <div className="flex flex-col items-center gap-2">
          {authLoading ? (
            <div className="h-11 w-[260px] animate-pulse rounded-md bg-muted sm:w-[280px]" />
          ) : user ? (
            <div className="mx-auto flex w-full max-w-md items-center gap-4 rounded-xl border border-border/50 bg-card/50 px-4 py-3">
              {user.avatarUrl ? (
                <img
                  src={user.avatarUrl}
                  alt=""
                  className="h-12 w-12 shrink-0 rounded-xl object-cover"
                  width={48}
                  height={48}
                />
              ) : (
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/20 text-lg font-medium text-primary">
                  {(user.name || user.email).charAt(0).toUpperCase()}
                </span>
              )}
              <div className="min-w-0 flex-1 text-left">
                <p className="truncate text-sm font-medium text-foreground">
                  {user.name || user.email}
                </p>
                <p className="truncate text-xs text-muted-foreground">
                  {user.email}
                </p>
              </div>
              <button
                type="button"
                onClick={handleSignOut}
                className="shrink-0 rounded-md p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                aria-label={COPY.site.nav.signOut}
              >
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          ) : (
            <>
              <a
                href={authUrl}
                className="inline-flex min-w-[260px] items-center justify-center gap-3 rounded-lg border border-[#dadce0] bg-white px-5 py-3 font-medium text-[#3c4043] shadow-sm transition-colors hover:bg-[#f8f9fa] hover:border-[#dadce0] sm:min-w-[280px] dark:border-neutral-600 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700"
              >
                {/* Google G logo - official multi-color */}
                <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24" aria-hidden>
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                <span className="text-[15px]">{COPY.deploy.signInWithGoogle}</span>
              </a>
              <p className="mt-5 text-xs text-muted-foreground">
                {COPY.deploy.signInHint}
              </p>
            </>
          )}
        </div>
      </div>

      <div className="space-y-4 text-center">
        <h2 className="font-heading text-xl font-semibold tracking-tight text-muted-foreground">
          {COPY.deploy.modelQuestion}
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
          {COPY.deploy.channelQuestion}
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
                    {COPY.deploy.comingSoon}
                  </Badge>
                )}
                <c.icon className="h-8 w-8 shrink-0 text-primary" />
                <span className="font-heading text-sm font-medium">
                  {c.label}
                </span>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {user && model && channel && !CHANNELS.find((c) => c.id === channel)?.comingSoon && (
        <div className="flex justify-center pt-4">
          <Button
            size="lg"
            className="min-w-[200px] gap-2 font-heading"
            onClick={() => setDeployModalOpen(true)}
          >
            {COPY.deploy.deployButton}
          </Button>
        </div>
      )}

      {user && model && channel && (
        <>
          <DeployModal
            open={deployModalOpen}
            onOpenChange={setDeployModalOpen}
            user={user}
            model={model}
            channel={channel}
            serversLeft={serversLeft}
            onDeployOpenClaw={handleDeployOpenClaw}
          />
          <ConnectTelegramModal
            open={connectTelegramOpen}
            onOpenChange={setConnectTelegramOpen}
            onSave={handleTelegramSave}
          />
        </>
      )}
    </div>
  );
}
