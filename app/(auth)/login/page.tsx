import { LoginView } from "@/features/login";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login | Veylora",
  description: "Sign in to capture, lock, and review decisions with an honest past self.",
};

export default function LoginPage() {
  return <LoginView />;
}
