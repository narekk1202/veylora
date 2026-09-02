import { RegisterView } from "@/features/auth";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register",
  description:
    "A private journal for decisions you make before the outcome arrives.",
  alternates: {
    canonical: "/register",
  },
};

export default function RegisterPage() {
  return <RegisterView />;
}
