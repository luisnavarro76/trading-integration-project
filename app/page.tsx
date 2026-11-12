import HeroSection from "@/components/HeroSection";
import HeroSection1 from "@/components/HeroSection1";
import VibeDiscoveryCards from "@/components/VibeDiscoveryCards";
import VibeTokenList from "@/components/VibeTokenList";

export default function Home() {
  return (
    <div>
      <HeroSection1 />
      <VibeDiscoveryCards />
      <VibeTokenList />
      <HeroSection />
    </div>
  );
}
