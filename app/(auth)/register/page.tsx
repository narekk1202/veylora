import { RegisterView } from "@/features/register";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register | Veylora",
  description:
    "A private journal for decisions you make before the outcome arrives.",
};

export default function RegisterPage() {
  return <RegisterView />;
}
