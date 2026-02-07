"use client";

import { TelegramIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { COPY } from "@/lib/copy";
import { Check, Loader2 } from "lucide-react";

type FlowStep = "starting" | "confirm_user" | "success";

interface DeploymentFlowProps {
  step: FlowStep;
  confirming: boolean;
  botUsername: string | null;
  onConfirm: () => void;
  onStartNew: () => void;
}

export function DeploymentFlow({
  step,
  confirming,
  botUsername,
  onConfirm,
  onStartNew,
}: DeploymentFlowProps) {
  const botLink = botUsername ? `https://t.me/${botUsername}` : null;

  if (step === "starting") {
    return (
      <div className="mx-auto flex max-w-md flex-col items-center gap-6 rounded-xl border border-border/50 bg-card/50 px-6 py-10">
        <Loader2 className="h-12 w-12 animate-spin text-primary" aria-hidden />
        <div className="space-y-1 text-center">
          <h2 className="font-heading text-xl font-semibold">
            {COPY.deploymentFlow.startingTitle}
          </h2>
          <p className="text-sm text-muted-foreground">
            {COPY.deploymentFlow.startingHint}
          </p>
        </div>
      </div>
    );
  }

  if (step === "confirm_user") {
    return (
      <div className="mx-auto flex max-w-md flex-col gap-6 rounded-xl border border-border/50 bg-card/50 px-6 py-8">
        <div className="flex items-center gap-2">
          <TelegramIcon className="h-6 w-6 text-[#0088cc]" />
          <h2 className="font-heading text-lg font-semibold">
            {COPY.deploymentFlow.connectYourTelegram}
          </h2>
        </div>
        <ol className="list-inside list-decimal space-y-2 text-sm text-muted-foreground">
          <li>{COPY.deploymentFlow.connectStep1}</li>
          <li>{COPY.deploymentFlow.connectStep2}</li>
          <li>{COPY.deploymentFlow.connectStep3}</li>
        </ol>
        {botLink && (
          <a
            href={botLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-primary hover:underline"
          >
            Open your bot: @{botUsername}
          </a>
        )}
        <Button
          className="w-full gap-2"
          size="lg"
          onClick={onConfirm}
          disabled={confirming}
        >
          {confirming ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              {COPY.deploymentFlow.confirming}
            </>
          ) : (
            COPY.deploymentFlow.confirmButton
          )}
        </Button>
      </div>
    );
  }

  // success
  return (
    <div className="mx-auto flex max-w-md flex-col gap-6 rounded-xl border border-border/50 bg-card/50 px-6 py-8">
      <div className="flex flex-col items-center gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-500/20 text-green-500">
          <Check className="h-8 w-8" />
        </div>
        <div className="space-y-1 text-center">
          <h2 className="font-heading text-xl font-semibold text-foreground">
            {COPY.deploymentFlow.successTitle}
          </h2>
          <p className="text-sm text-muted-foreground">
            {COPY.deploymentFlow.successMessage}
          </p>
        </div>
      </div>
      <div className="space-y-3 rounded-lg border border-border/50 bg-muted/30 p-4">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">
            {COPY.deploymentFlow.remainingCredits}
          </span>
          <span className="font-semibold">$10</span>
        </div>
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>{COPY.deploymentFlow.usedToday}</span>
          <span>$0</span>
        </div>
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>{COPY.deploymentFlow.usedThisMonth}</span>
          <span>$0</span>
        </div>
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>{COPY.deploymentFlow.planPerMonth}</span>
          <span>$10</span>
        </div>
        <div className="flex flex-col gap-2 pt-2">
          <div className="flex gap-2">
            <input
              type="text"
              readOnly
              value="$ 10"
              className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm"
            />
            <Button variant="secondary" size="sm">
              {COPY.deploymentFlow.purchaseCredit} →
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            {COPY.deploymentFlow.oneTimePurchase}
          </p>
        </div>
      </div>
      <Button variant="outline" onClick={onStartNew}>
        {COPY.deploymentFlow.startNewDeployment}
      </Button>
    </div>
  );
}
