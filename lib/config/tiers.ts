// Real Jovia membership packages — Silver and Gold. Inside the system,
// $1 = ₦1,000; each package sets its own per-second earning rate plus a
// fixed breakdown of bonus activities.
export const exchangeRate = "$1 = ₦1,000 inside the system";

export type EarningLine = { label: string; value: string; note?: string };

export type MembershipPackage = {
  id: string;
  name: string;
  accessFee: string;
  perSecond: string;
  per20Seconds: string;
  highlighted: boolean;
  earnings: EarningLine[];
  extras: EarningLine[];
};

export const membershipPackages: MembershipPackage[] = [
  {
    id: "silver",
    name: "Jovia Silver",
    accessFee: "₦9,000",
    perSecond: "₦50",
    per20Seconds: "₦1,000",
    highlighted: false,
    earnings: [
      { label: "Smash Bonus", value: "₦9,000" },
      { label: "Sales Earnings", value: "₦7,000" },
      { label: "Celebrity Videos", value: "₦1,500", note: "per 30 sec" },
      { label: "Fun Games", value: "₦3,000", note: "per 60 sec, win or lose" },
      { label: "Meta Activities", value: "₦2,000" },
      { label: "Music Streaming", value: "₦1,000" },
      { label: "Spillovers", value: "₦200–₦400" },
    ],
    extras: [
      { label: "Debit card activation bonus", value: "$3 (optional)" },
      { label: "Friday Bonus Rewards", value: "Not active" },
      { label: "Jovia AI", value: "Not active" },
      { label: "Countdown time", value: "Fixed, no changes" },
    ],
  },
  {
    id: "gold",
    name: "Jovia Gold",
    accessFee: "₦15,000",
    perSecond: "₦100",
    per20Seconds: "₦2,000",
    highlighted: true,
    earnings: [
      { label: "Smash Bonus", value: "₦15,000" },
      { label: "Sales Earnings", value: "₦13,000" },
      { label: "Celebrity Videos", value: "₦3,000", note: "per 30 sec" },
      { label: "Fun Games", value: "₦6,000", note: "per 60 sec, win or lose" },
      { label: "Meta Activities", value: "₦3,000" },
      { label: "Music Streaming", value: "₦2,000" },
      { label: "Spillovers", value: "₦400–₦600" },
    ],
    extras: [
      { label: "Debit card activation bonus", value: "$6 (optional)" },
      { label: "Friday Bonus Rewards", value: "Tap & withdraw $10" },
      { label: "Jovia AI", value: "Ready to assist" },
      { label: "Countdown time", value: "Adjustable, 30 sec – 1 hr" },
    ],
  },
];
