// New members are handed off to a human vendor on Telegram to finish
// onboarding — there is no in-app chat or bot, just a prefilled deep link
// into a real Telegram account.
const VENDOR_USERNAME = "Joviavendor";
const START_MESSAGE = "From Jovia Network, how do I get started?";

export const telegramVendorUrl = `https://t.me/${VENDOR_USERNAME}?text=${encodeURIComponent(START_MESSAGE)}`;

// No real Telegram group invite link has been provided yet. Rather than
// fabricate one (a broken/fake t.me link is worse than no link), this falls
// back to the vendor DM — set TELEGRAM_GROUP_URL once a real group invite
// link exists and every "Join VIP Telegram Group" CTA picks it up.
export const telegramGroupUrl = process.env.TELEGRAM_GROUP_URL || telegramVendorUrl;
