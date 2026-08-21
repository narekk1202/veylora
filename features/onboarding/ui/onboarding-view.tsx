import BrandingHeader from "@/shared/components/branding-header";
import InfoCard from './info-card'

const OnboardingView = () => {
  return (
    <main className="page_container px-2">
      <BrandingHeader
        title="Learn from your past self."
        description="A decision journal that locks your reasoning before outcomes — so hindsight stays honest."
      />

      <InfoCard />
    </main>
  );
};

export default OnboardingView;
