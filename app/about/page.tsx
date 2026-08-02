"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
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
    <div className="space-y-12">
      {/* Back Link */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400 hover:text-foreground mb-8 transition-colors font-sans"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </Link>

      {/* About Sections List */}
      <div className="space-y-10">
        {aboutSections.map((section) => {
          return (
            <section
              key={section.id}
              className="py-6 border-b border-zinc-200 dark:border-zinc-800 space-y-4"
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
                    <h3 className="text-base font-mono font-semibold text-zinc-800 dark:text-zinc-200">
                      Education
                    </h3>
                    <div className="space-y-4 pl-1 border-l-2 border-zinc-200 dark:border-zinc-800 ml-2">
                      {educationList.map((edu, idx) => (
                        <div key={idx} className="relative pl-5 space-y-1">
                          <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-red-600 dark:bg-red-400" />
                          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                            <h4 className="font-mono font-medium text-sm text-foreground">
                              {edu.degree}
                              {edu.gpaOrHonors && (
                                <span className="ml-2 text-xs font-normal text-red-600 dark:text-red-400">
                                  ({edu.gpaOrHonors})
                                </span>
                              )}
                            </h4>
                            {edu.dates && (
                              <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400">
                                {edu.dates}
                              </span>
                            )}
                          </div>
                          {edu.institution && (
                            <p className="text-xs font-sans text-zinc-600 dark:text-zinc-400">
                              {edu.institution}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Volunteering Section */}
                  <div className="space-y-4">
                    <h3 className="text-base font-mono font-semibold text-zinc-800 dark:text-zinc-200">
                      Volunteering
                    </h3>
                    <div className="space-y-4 pl-1 border-l-2 border-zinc-200 dark:border-zinc-800 ml-2">
                      {volunteeringExperience.map((vol, idx) => (
                        <div key={idx} className="relative pl-5 space-y-1">
                          <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-red-600 dark:bg-red-400" />
                          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                            <h4 className="font-mono font-medium text-sm text-foreground">
                              {vol.title}
                            </h4>
                            <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400">
                              {vol.dates}
                            </span>
                          </div>
                          <p className="text-xs font-sans text-zinc-600 dark:text-zinc-400">
                            {vol.organization}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Relevant Experience Timeline */}
                  <div className="space-y-4">
                    <h3 className="text-base font-mono font-semibold text-zinc-800 dark:text-zinc-200">
                      Experience
                    </h3>
                    <div className="space-y-6 pl-1 border-l-2 border-zinc-200 dark:border-zinc-800 ml-2">
                      {relevantExperience.map((exp, idx) => (
                        <div key={idx} className="relative pl-5 space-y-2">
                          <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-red-600 dark:bg-red-400" />

                          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                            <h4 className="font-mono font-medium text-sm text-foreground">
                              {exp.title}
                            </h4>
                            {exp.dates && (
                              <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400">
                                {exp.dates}
                              </span>
                            )}
                          </div>

                          {exp.organization && (
                            <p className="text-xs font-sans text-zinc-600 dark:text-zinc-400">
                              {exp.organization}
                            </p>
                          )}

                          <ul className="list-disc list-inside space-y-1 pt-1 text-xs font-sans text-zinc-600 dark:text-zinc-400 leading-relaxed">
                            {exp.responsibilities.map((resp, rIdx) => (
                              <li key={rIdx} className="leading-5">
                                <span>{resp}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
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
            </section>
          );
        })}
      </div>
    </div>
  );
}
