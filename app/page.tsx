import HeroSection from "@/components/hero/HeroSection";
import LiveMetricsTicker from "@/components/widgets/LiveMetricsTicker";
import ToolsTeaser from "@/components/home/ToolsTeaser";
import EcosystemVisualizer from "@/components/widgets/EcosystemVisualizer";
import WhyNuuhaven from "@/components/home/WhyNuuhaven";
import SelectedWork from "@/components/home/SelectedWork";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import ServicesSection from "@/components/home/ServicesSection";
import DiscoveryCTA from "@/components/home/DiscoveryCTA";

export default function Home() {
  return (
    <>
      <HeroSection />
      <LiveMetricsTicker />
      <ToolsTeaser />
      <EcosystemVisualizer />
      <WhyNuuhaven />
      <SelectedWork />
      <TestimonialsSection />
      <ServicesSection />
      <DiscoveryCTA />
    </>
  );
}
