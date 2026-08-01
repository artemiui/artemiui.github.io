import BioSection from "@/components/sections/BioSection";
import FeedSection from "@/components/sections/FeedSection";

export default function Home() {
  return (
    <div className="space-y-8 sm:space-y-12 text-xl font-semibold mb-6 overflow-x-hidden">
      <BioSection />
      <FeedSection />
    </div>
  );
}
