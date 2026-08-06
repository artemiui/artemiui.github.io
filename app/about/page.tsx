"use client";

import Link from "next/link";
import { ArrowLeft, Music, Mic, PenTool, Palette, Layout } from "lucide-react";
import { motion } from "framer-motion";
import CurrentObsessions from "@/components/CurrentObsessions";
import GenshinStatsWidget from "@/components/GenshinStatsWidget";

type EducationItem = {
  degree: string;
  institution?: string;
  dates?: string;
  gpaOrHonors?: string;
};

type VolunteeringItem = {
  title: string;
  organization: string;
  dates: string;
};

type ExperienceItem = {
  title: string;
  organization: string | null;
  dates: string | null;
  responsibilities: string[];
};

type SaveFile = {
  id: string;
  title: string;
};

const educationList: EducationItem[] = [
  {
    degree: "Bachelor of Science in Statistics",
    institution: "University of the Philippines, Diliman",
    dates: "2026 – Present",
  },
  {
    degree: "Bachelor of Arts in Philosophy",
    institution: "University of the Philippines, Diliman",
    dates: "2025 – 2026",
    gpaOrHonors: "GWA: 1.17",
  },
  {
    degree: "High School",
    gpaOrHonors: "With Highest Honors",
  },
];

const volunteeringExperience: VolunteeringItem[] = [
  {
    title: "Media Volunteer",
    organization: "UP Office of Athletics and Sports Development",
    dates: "Q1 2026 – Present",
  },
  {
    title: "Graphics Volunteer",
    organization: "UP Esports Varsity Team",
    dates: "Q2 2026 – Present",
  },
];

const relevantExperience: ExperienceItem[] = [
  {
    title: "Deputy Director, Research Fellow",
    organization: "UP Data Science Society",
    dates: "Q4 2025 – Present",
    responsibilities: [
      "Current co-head of the Philippine Junior Data Science Challenge 2026",
      "Helped organize the 2025 Philippine Junior Data Science Challenge for over 30 teams nationwide with work involving publication, facilitation, and internals.",
      "Engineered and a self-curated dataset of 550 iterations of molecular binding strength and toxicity for streamlined, machine learning-powered drug screening.",
    ],
  },
  {
    title: "Research & Creative Work",
    organization: "University of the Philippines Resilience Institute",
    dates: "June 2025 – August 2025",
    responsibilities: [
      "Extensive research in policy development regarding the AI use in healthcare, education, and generational and social impacts of artificial intelligence on community resilience.",
      "Created publication materials for 3 ad hoc projects of the institution.",
      "Collaborated with stakeholders, key administrative figures of the university.",
    ],
  },
  {
    title: "Human Resources Intern",
    organization: "Concentrix, UP-Ayala Technohub",
    dates: "January 2025 – February 2025",
    responsibilities: [
      "Worked in the Recruitment Hub processing center facilitating over 100 applicants on official Moodle-based proficiency examinations through the application system.",
    ],
  },
  {
    title: "Student Researcher",
    organization: null,
    dates: null,
    responsibilities: [
      "Authored a peer-reviewed, published quantitative research paper under the International Journal of Rural and Urban Development, surveying 278 respondents across 4 cities and presented to a DLSAU-hosted research conference.",
      "Engineered a geophysical machine learning-based curvefit algorithm to predict aftershock parameters.",
      "Presented to the UP Resilience Institute and professors at the National Institute of Geological Sciences, reaching an audience with top geophysicists in the country.",
      "Authored a computational biology project for anticancer research, spearheading the data analysis, live experimentation, and computational modeling for a high school capstone project.",
    ],
  },
];

const skillsList = [
  { name: "Piano", icon: Music },
  { name: "Casual Singing", icon: Mic },
  { name: "Creative Writing", icon: PenTool },
  { name: "Illustration", icon: Palette },
  { name: "Layout & Graphic Design", icon: Layout },
];

const aboutSections: SaveFile[] = [
  {
    id: "hobbies",
    title: "Things I love",
  },
  {
    id: "education",
    title: "My professional background",
  },
];

export default function AboutPage() {
  return (
    <div className="space-y-8">
      {/* Header & Back Link Container */}
      <div className="space-y-1">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-zinc-600 hover:text-foreground transition-colors font-sans"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>
        </motion.div>
      </div>

      {/* Personal Description Placeholder */}
      <motion.section
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.05 }}
        className="pb-6 border-b border-zinc-200 dark:border-zinc-800 space-y-4"
      >
        <h1 className="text-2xl font-mono font-bold text-foreground">Who I am</h1>
        <p className="text-sm font-sans text-zinc-600 dark:text-zinc-400 leading-relaxed">
          I'm a statistics student from UP Diliman with an interest in quantitative finance, biostatistics, computational physics, analytical philosophy (language), AI philosophy, and xAI. I believe that a healthy intersection of the liberal arts and technical ability goes a long way.
        </p>

        {/* Skills & Pursuits */}
        <div className="pt-2 space-y-2">
          <span className="text-xs font-mono font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
            Skills & Creative Pursuits
          </span>
          <div className="flex flex-wrap gap-2 pt-0.5">
            {skillsList.map((skill, idx) => {
              const Icon = skill.icon;
              return (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-mono text-zinc-700 dark:text-zinc-300 bg-zinc-200/60 dark:bg-zinc-800/60 border border-zinc-300/60 dark:border-zinc-700/60 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors"
                >
                  <Icon className="w-3.5 h-3.5 text-red-600 dark:text-red-500" />
                  {skill.name}
                </span>
              );
            })}
          </div>
        </div>
      </motion.section>

      {/* About Sections List */}
      <div className="space-y-10">
        {aboutSections.map((section, sIndex) => {
          return (
            <motion.section
              key={section.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: sIndex * 0.1 }}
              className="py-6 border-b border-zinc-200 space-y-4"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-mono font-semibold text-foreground">
                  {section.title}
                </h2>
              </div>

              {/* Education, Volunteering & Experience Sub-sections */}
              {section.id === "education" && (
                <div className="mt-4 space-y-8">
                  {/* Education History */}
                  <div className="space-y-4">
                    <h3 className="text-base font-mono font-semibold text-zinc-800">
                      Education
                    </h3>
                    <div className="space-y-4 pl-1 border-l-2 border-zinc-200 ml-2">
                      {educationList.map((edu, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: idx * 0.05 }}
                          className="relative pl-5 space-y-1"
                        >
                          <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-red-600" />
                          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                            <h4 className="font-mono font-medium text-sm text-foreground">
                              {edu.degree}
                              {edu.gpaOrHonors && (
                                <span className="ml-2 text-xs font-normal text-red-600">
                                  ({edu.gpaOrHonors})
                                </span>
                              )}
                            </h4>
                            {edu.dates && (
                              <span className="text-xs font-mono text-zinc-500">
                                {edu.dates}
                              </span>
                            )}
                          </div>
                          {edu.institution && (
                            <p className="text-xs font-sans text-zinc-600">
                              {edu.institution}
                            </p>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Volunteering Section */}
                  <div className="space-y-4">
                    <h3 className="text-base font-mono font-semibold text-zinc-800">
                      Volunteering
                    </h3>
                    <div className="space-y-4 pl-1 border-l-2 border-zinc-200 ml-2">
                      {volunteeringExperience.map((vol, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: idx * 0.05 }}
                          className="relative pl-5 space-y-1"
                        >
                          <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-red-600" />
                          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                            <h4 className="font-mono font-medium text-sm text-foreground">
                              {vol.title}
                            </h4>
                            <span className="text-xs font-mono text-zinc-500">
                              {vol.dates}
                            </span>
                          </div>
                          <p className="text-xs font-sans text-zinc-600">
                            {vol.organization}
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Relevant Experience Timeline */}
                  <div className="space-y-4">
                    <h3 className="text-base font-mono font-semibold text-zinc-800">
                      Experience
                    </h3>
                    <div className="space-y-6 pl-1 border-l-2 border-zinc-200 ml-2">
                      {relevantExperience.map((exp, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: idx * 0.05 }}
                          className="relative pl-5 space-y-2"
                        >
                          <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-red-600" />

                          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                            <h4 className="font-mono font-medium text-sm text-foreground">
                              {exp.title}
                            </h4>
                            {exp.dates && (
                              <span className="text-xs font-mono text-zinc-500">
                                {exp.dates}
                              </span>
                            )}
                          </div>

                          {exp.organization && (
                            <p className="text-xs font-sans text-zinc-600">
                              {exp.organization}
                            </p>
                          )}

                          <ul className="list-disc list-inside space-y-1 pt-1 text-xs font-sans text-zinc-600 leading-relaxed">
                            {exp.responsibilities.map((resp, rIdx) => (
                              <li key={rIdx} className="leading-5">
                                <span>{resp}</span>
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Interactive Current Obsessions & Genshin Akasha Widgets */}
              {section.id === "hobbies" && (
                <div className="pt-4 space-y-8">
                  <CurrentObsessions />
                  <GenshinStatsWidget uid="833534626" profileUrl="https://akasha.cv/profile/833534626" />
                </div>
              )}
            </motion.section>
          );
        })}
      </div>
    </div>
  );
}
