import { LoginView } from "@/features/auth";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
  description:
    "Sign in to capture, lock, and review decisions with an honest past self.",
  alternates: {
    canonical: "/login",
  },
};

export default function LoginPage() {
  return <LoginView />;
}
