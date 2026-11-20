"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { MinimalHero } from "@/components/MinimalHero";
import { MinimalProjects } from "@/components/MinimalProjects";
import { MinimalResearch } from "@/components/MinimalResearch";
import { MinimalExperience } from "@/components/MinimalExperience";
import { MinimalActivities } from "@/components/MinimalActivities";
import { ActivityGrid } from "@/components/ActivityGrid";
import { MinimalEducation } from "@/components/MinimalEducation";
import { MinimalSkills } from "@/components/MinimalSkills";
import { MinimalContact } from "@/components/MinimalContact";
import { MinimalFooter } from "@/components/MinimalFooter";
import { CustomScrollbar } from "@/components/CustomScrollbar";
import { ContactModal } from "@/components/ContactModal";
import { ResumeModal } from "@/components/ResumeModal";

export default function Home() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#09090b] text-[#fafafa] selection:bg-[#ff2d78] selection:text-white font-sans relative">
      {/* Top Site Navigation */}
      <Navbar
        onOpenContact={() => setIsContactOpen(true)}
        onOpenResume={() => setIsResumeOpen(true)}
      />

      {/* Main Content Sections */}
      <main id="top">
        <MinimalHero
          onOpenContact={() => setIsContactOpen(true)}
          onOpenResume={() => setIsResumeOpen(true)}
        />
        <MinimalProjects />
        <MinimalResearch />
        <MinimalExperience />
        <MinimalActivities />
        <ActivityGrid />
        <MinimalEducation />
        <MinimalSkills />
        <MinimalContact onOpenContact={() => setIsContactOpen(true)} />
      </main>

      {/* Custom Right-Edge Gliding Scrollbar */}
      <CustomScrollbar />

      {/* Footer */}
      <MinimalFooter />

      {/* Modals */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />
    </div>
  );
}
