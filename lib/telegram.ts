// New members are handed off to a human vendor on Telegram to finish
// onboarding — there is no in-app chat or bot, just a prefilled deep link
// into a real Telegram account.
const VENDOR_USERNAME = "Joviavendor";
const START_MESSAGE = "From Jovia Network, how do I get started?";

export const telegramVendorUrl = `https://t.me/${VENDOR_USERNAME}?text=${encodeURIComponent(START_MESSAGE)}`;
