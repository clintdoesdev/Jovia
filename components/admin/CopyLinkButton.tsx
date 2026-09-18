"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

export function CopyLinkButton({ url }: { url: string }) {
  const [copied, setCopied] = useState(false);

  return (
    <Button
      type="button"
      variant="ghost"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(url);
          setCopied(true);
          setTimeout(() => setCopied(false), 1500);
        } catch {
          // Clipboard API can be unavailable (permissions, insecure context).
          // The caller renders the raw URL as selectable text too, so this
          // failing silently still leaves a working fallback on the page.
        }
      }}
    >
      {copied ? "Copied!" : "Copy link"}
    </Button>
  );
}
