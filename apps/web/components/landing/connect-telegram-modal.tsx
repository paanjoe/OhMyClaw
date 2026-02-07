"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { TelegramIcon } from "@/components/icons";
import { COPY } from "@/lib/copy";
import { Check, Loader2 } from "lucide-react";

interface ConnectTelegramModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave?: (token: string) => void | Promise<void>;
}

const STEPS = [
  COPY.connectTelegram.step1,
  COPY.connectTelegram.step2,
  COPY.connectTelegram.step3,
  COPY.connectTelegram.step4,
  COPY.connectTelegram.step5,
] as const;

export function ConnectTelegramModal({
  open,
  onOpenChange,
  onSave,
}: ConnectTelegramModalProps) {
  const [token, setToken] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (open) setError(null);
  }, [open]);

  const handleSubmit = async () => {
    const t = token.trim();
    if (!t || !onSave) return;
    setSaving(true);
    setError(null);
    try {
      await onSave(t);
      setToken("");
      onOpenChange(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : COPY.connectTelegram.saveError);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md" showClose={true}>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <TelegramIcon className="h-5 w-5 text-[#0088cc]" />
            {COPY.connectTelegram.title}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 pt-2">
          <h3 className="text-sm font-medium text-foreground">
            {COPY.connectTelegram.howToGetToken}
          </h3>
          <p className="text-xs text-muted-foreground">
            {COPY.connectTelegram.botFatherNote}
          </p>
          <ol className="list-inside list-decimal space-y-2 text-sm text-muted-foreground">
            {STEPS.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ol>
          <div className="space-y-2">
            <label
              htmlFor="telegram-token"
              className="text-sm font-medium text-foreground"
            >
              {COPY.connectTelegram.tokenLabel}
            </label>
            <input
              id="telegram-token"
              type="text"
              placeholder={COPY.connectTelegram.tokenPlaceholder}
              value={token}
              onChange={(e) => setToken(e.target.value)}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            />
          </div>
          {error && (
            <p className="text-sm text-destructive" role="alert">
              {error}
            </p>
          )}
          <Button
            className="w-full gap-2"
            onClick={handleSubmit}
            disabled={!token.trim() || saving}
          >
            {saving ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                {COPY.connectTelegram.saving}
              </>
            ) : (
              <>
                <Check className="h-4 w-4" />
                {COPY.connectTelegram.saveAndConnect}
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
