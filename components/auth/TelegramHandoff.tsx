"use client";

import { useEffect } from "react";
import { FaTelegram } from "react-icons/fa6";
import { ButtonLink } from "@/components/ui/Button";
import { telegramVendorUrl } from "@/lib/telegram";

const AUTO_REDIRECT_DELAY_MS = 1500;

export function TelegramHandoff() {
  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = telegramVendorUrl;
    }, AUTO_REDIRECT_DELAY_MS);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="rounded-2xl border border-border bg-surface p-8 text-center">
      <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#229ED9]/15 text-[#229ED9]">
        <FaTelegram size={24} />
      </span>
      <h2 className="mt-5 text-lg font-semibold text-foreground">
        Your account is ready
      </h2>
      <p className="mt-2 text-sm text-muted">
        Taking you to our Telegram vendor to get started — if nothing
        happens, tap the button below.
      </p>

      <ButtonLink href={telegramVendorUrl} variant="cta" className="mt-6 w-full py-3.5 text-base">
        Continue on Telegram
      </ButtonLink>

      <p className="mt-5 text-xs text-muted-soft">
        Already have Telegram? It&apos;ll open straight into a chat with{" "}
        <span className="font-semibold text-foreground">@Joviavendor</span>.
      </p>
    </div>
  );
}
