"use client";

import { useState } from "react";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import ManifestoSection from "@/components/ManifestoSection";
import ActivitiesSection from "@/components/ActivitiesSection";
import FlagshipEventSection from "@/components/FlagshipEventSection";
import PastBuildsSection from "@/components/PastBuildsSection";
import SubscribeSection from "@/components/SubscribeSection";
import Footer from "@/components/Footer";
import RegistrationDrawer from "@/components/RegistrationDrawer";
import Signal from "@/components/Signal";

export default function Home() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState("Nirmith '26 Hackathon");

  const handleOpenDrawer = (eventTitle?: string) => {
    if (eventTitle) {
      setSelectedEvent(eventTitle);
    }
    setIsDrawerOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#f5f2ec] text-[#1c1b1a] flex flex-col justify-between">
      <Navigation onOpenDrawer={handleOpenDrawer} />
      <Signal />

      <main className="flex-1">
        <HeroSection onOpenDrawer={handleOpenDrawer} />
        <ManifestoSection />
        <ActivitiesSection />
        <FlagshipEventSection onOpenDrawer={handleOpenDrawer} />
        <PastBuildsSection />
        <SubscribeSection />
      </main>

      <Footer />

      <RegistrationDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        defaultEvent={selectedEvent}
      />
    </div>
  );
}
