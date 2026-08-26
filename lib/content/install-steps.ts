export const installSteps = [
  {
    platform: "iPhone & iPad (Safari)",
    steps: [
      "Open joviawebsite.com.ng in Safari.",
      'Tap the Share icon, then choose "Add to Home Screen."',
      'Tap "Add" — the Jovia icon now opens straight to the site.',
    ],
  },
  {
    platform: "Android (Chrome)",
    steps: [
      "Open joviawebsite.com.ng in Chrome.",
      'Tap the ⋮ menu, then choose "Add to Home screen" or "Install app" if offered.',
      "Confirm — Jovia now launches like any other installed app.",
    ],
  },
  {
    platform: "Desktop (Chrome or Edge)",
    steps: [
      "Open joviawebsite.com.ng.",
      "Click the install icon in the address bar (or the browser menu's \"Install Jovia…\" option).",
      "Jovia opens in its own window from your dock or taskbar.",
    ],
  },
] as const;
