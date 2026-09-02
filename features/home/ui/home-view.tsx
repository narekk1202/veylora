import BrandingHeader from "@/shared/components/branding-header";
import JsonLd from "@/shared/components/json-ld";
import { buttonVariants } from "@/shared/components/ui/button";
import {
  SITE_DESCRIPTION,
  SITE_NAME,
  getSiteUrl,
} from "@/shared/constants/seo.consts";
import { cn } from "@/shared/lib/utils";
import Link from "next/link";

const steps = [
  {
    title: "Capture before you decide",
    description:
      "Write the question, options, reasoning, and what you expect to happen.",
  },
  {
    title: "Lock your record",
    description:
      "Once locked, your original thinking can't be edited — preventing hindsight bias.",
  },
  {
    title: "Review with honesty",
    description:
      "When the review date arrives, compare prediction to reality and extract lessons.",
  },
];

const HomeView = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: SITE_NAME,
    applicationCategory: "LifestyleApplication",
    operatingSystem: "Web",
    description: SITE_DESCRIPTION,
    url: getSiteUrl(),
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  return (
    <main className="container mx-auto flex min-h-svh flex-col items-center justify-center px-2 py-10">
      <JsonLd data={jsonLd} />
      <BrandingHeader
        title="Learn from your past self."
        description="A decision journal that locks your reasoning before outcomes — so hindsight stays honest."
      />

      <ol className="mt-10 flex w-full max-w-2xl flex-col gap-3">
        {steps.map((step, index) => (
          <li
            key={step.title}
            className="bg-card flex items-center gap-5 rounded-lg border px-6 py-4"
          >
            <span className="text-primary text-sm">{index + 1}</span>
            <div className="flex flex-col gap-1">
              <h2 className="text-sm font-medium">{step.title}</h2>
              <p className="text-muted-foreground text-sm">
                {step.description}
              </p>
            </div>
          </li>
        ))}
      </ol>

      <div className="mt-8 flex w-full max-w-md flex-col items-center gap-3">
        <Link
          href="/register"
          className={cn(buttonVariants(), "h-12 w-full max-w-md")}
        >
          Create an account
        </Link>
        <div>
          <span className="text-muted-foreground text-sm">
            Already have an account?
          </span>
          <Link
            href="/login"
            className={cn(
              buttonVariants({ variant: "link" }),
              "text-foreground px-1",
            )}
          >
            Sign in
          </Link>
        </div>
      </div>
    </main>
  );
};

export default HomeView;
