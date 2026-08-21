import { LoginView } from '@/features/auth'
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login | Veylora",
  description:
    "Sign in to capture, lock, and review decisions with an honest past self.",
};

export default function LoginPage() {
  return <LoginView />;
}
