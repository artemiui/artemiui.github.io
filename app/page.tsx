import BioSection from "@/components/sections/BioSection";
import FeedSection from "@/components/sections/FeedSection";

export default function Home() {
  return (
    <div className="space-y-6 overflow-x-hidden">
      <BioSection />
      <FeedSection />
    </div>
  );
}
