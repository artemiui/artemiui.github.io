"use client";

import { useState } from "react";
import DSiIntro from "@/components/DSiIntro";

interface IntroWrapperProps {
  children: React.ReactNode;
}

export default function IntroWrapper({ children }: IntroWrapperProps) {
  const [showIntro, setShowIntro] = useState(true);

  const handleIntroComplete = () => {
    setShowIntro(false);
  };

  if (showIntro) {
    return <DSiIntro onComplete={handleIntroComplete} />;
  }

  return <>{children}</>;
}