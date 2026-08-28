"use client";

import { useState } from "react";
import ObsidianGraphIntro from "@/components/ObsidianGraphIntro";

interface IntroWrapperProps {
  children: React.ReactNode;
}

export default function IntroWrapper({ children }: IntroWrapperProps) {
  const [showIntro, setShowIntro] = useState(true);

  const handleIntroComplete = () => {
    setShowIntro(false);
  };

  return (
    <>
      {showIntro && <ObsidianGraphIntro onComplete={handleIntroComplete} />}
      {children}
    </>
  );
}
