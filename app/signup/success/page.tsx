import type { Metadata } from "next";
import { AuthSplitLayout } from "@/components/auth/AuthSplitLayout";
import { TelegramHandoff } from "@/components/auth/TelegramHandoff";

export const metadata: Metadata = {
  title: "Account Created",
  robots: { index: false, follow: false },
};

export default function SignupSuccessPage() {
  return (
    <AuthSplitLayout
      badge="ACCOUNT CREATED"
      title="Welcome to Jovia"
      description="One last step — our vendor will get you set up on Telegram."
    >
      <TelegramHandoff />
    </AuthSplitLayout>
  );
}
