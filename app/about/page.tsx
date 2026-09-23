"use client";

import { Music, Mic, PenTool, Palette, Layout } from "lucide-react";
import { motion } from "framer-motion";
import InstitutionsCarousel from "@/components/InstitutionsCarousel";

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

type AwardItem = {
  title: string;
  event?: string;
  dates?: string;
};

type MicrocredentialItem = {
  title: string;
  issuer: string;
  logo: string | string[];
  dates?: string;
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
  {
    title: "Academic Committee",
    organization: "UP Philosophical Society",
    dates: "Q3 2026 – Present",
  },
  {
    title: "Board of Trustees",
    organization: "St. James Academy Alumni Association",
    dates: "Q3 2026 – Present",
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

const awardsList: AwardItem[] = [
  {
    title: "First Place, Philosophy of Science",
    event: "Emmanuel Q. Fernando Philosophy Undergraduate Conference",
    dates: "2026",
  },
  {
    title: "Best in Research, STEM Capstone, Excellence in IT, Excellence in Science",
    dates: "A.Y. 2024–2025",
  },
  {
    title: "Merit Award",
    event: "National Mathletics Challenge",
    dates: "A.Y. 2024–2025",
  },
  {
    title: "Regional Schools Press Conference Qualifier",
    dates: "A.Y. 2023–2024 & A.Y. 2024–2025",
  },
  {
    title: "First Runner Up, Finalist",
    event: "Quake Quest 2024",
    dates: "2024",
  },
];

const microcredentialsList: MicrocredentialItem[] = [
  {
    title: "AI Essentials: Theory & Practice",
    issuer: "UPOU",
    logo: "/logos/upou.png",
  },
  {
    title: "Business Analytics: Concepts & Frameworks",
    issuer: "UPOU",
    logo: "/logos/upou.png",
  },
  {
    title: "Data Science Certification",
    issuer: "IBM",
    logo: "/logos/ibm.svg",
  },
  {
    title: "Basic Visual & Graphic Design Training",
    issuer: "TESDA",
    logo: "/logos/tesda.svg",
  },
  {
    title: "Quake Quest",
    issuer: "UP Resilience Institute",
    logo: "/logos/upri-icon.png",
  },
  {
    title: "The Next Generation of Builders: Empowering Youth to Create Bias-Aware AI",
    issuer: "UP ISC",
    logo: "/logos/up-isc-icon.png",
  },
  {
    title: "AI for Good: Building a Sustainable Industrial Ecosystem",
    issuer: "UP ISC & CAICT",
    logo: ["/logos/up-isc-icon.png", "/logos/caict.svg"],
  },
  {
    title: "High-Performance Leadership: Lessons from F1®",
    issuer: "Santander Academy",
    logo: "/logos/santander-icon.svg",
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
    id: "education",
    title: "My professional background",
  },
];

export default function AboutPage() {
  return (
    <div className="space-y-8">
      {/* Personal Description Placeholder */}
      <motion.section
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.05 }}
        className="pb-6 border-b border-zinc-200 dark:border-zinc-800 space-y-4"
      >
        <h1 className="text-2xl font-mono font-bold text-foreground">Who I am</h1>
        <p className="text-sm font-sans text-zinc-600 dark:text-zinc-400 leading-relaxed">
          I'm a statistics student from UP Diliman with an interest in working in banking. Academically, I'm interested in in-silico pharmacology, biostatistics, analytical philosophy (language), AI philosophy, and xAI. I believe that a healthy intersection of the liberal arts and technical ability goes a long way.
        </p>

        {/* Skills & Pursuits */}
        <div className="pt-2 space-y-2">
          <span className="text-xs font-mono font-medium text-zinc-500 dark:text-zinc-400">
            Skills & Creative Pursuits
          </span>
          <div className="flex flex-wrap gap-2 pt-0.5">
            {skillsList.map((skill, idx) => {
              const Icon = skill.icon;
              return (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-sans text-zinc-600 dark:text-zinc-400 bg-zinc-100/80 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-800 rounded-md hover:text-foreground hover:bg-zinc-100 dark:hover:bg-zinc-800/80 transition-colors"
                >
                  <Icon className="w-3.5 h-3.5 text-zinc-500 dark:text-zinc-400" />
                  {skill.name}
                </span>
              );
            })}
          </div>
        </div>
      </motion.section>

      {/* The groups I've worked with Section */}
      <motion.section
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.08 }}
        className="pb-6 border-b border-zinc-200 dark:border-zinc-800 space-y-4"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-mono font-semibold text-foreground">
            I've worked with
          </h2>
        </div>
        <InstitutionsCarousel />
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
                    <div className="space-y-4">
                      {educationList.map((edu, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: idx * 0.05 }}
                          className="relative pl-4 space-y-1"
                        >
                          <div className="absolute left-0 top-1.5 w-2 h-2 rounded-full bg-zinc-900 dark:bg-zinc-100" />
                          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                            <h4 className="font-mono font-medium text-sm text-foreground">
                              {edu.degree}
                              {edu.gpaOrHonors && (
                                <span className="ml-2 text-xs font-normal text-zinc-600 dark:text-zinc-400">
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
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Volunteering Section */}
                  <div className="space-y-4">
                    <h3 className="text-base font-mono font-semibold text-zinc-800 dark:text-zinc-200">
                      Volunteering
                    </h3>
                    <div className="space-y-4">
                      {volunteeringExperience.map((vol, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: idx * 0.05 }}
                          className="relative pl-4 space-y-1"
                        >
                          <div className="absolute left-0 top-1.5 w-2 h-2 rounded-full bg-zinc-900 dark:bg-zinc-100" />
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
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Relevant Experience Timeline */}
                  <div className="space-y-4">
                    <h3 className="text-base font-mono font-semibold text-zinc-800 dark:text-zinc-200">
                      Experience
                    </h3>
                    <div className="space-y-6">
                      {relevantExperience.map((exp, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: idx * 0.05 }}
                          className="relative pl-4 space-y-2"
                        >
                          <div className="absolute left-0 top-1.5 w-2 h-2 rounded-full bg-zinc-900 dark:bg-zinc-100" />

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
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Awards & Accolades Section */}
                  <div className="space-y-4">
                    <h3 className="text-base font-mono font-semibold text-zinc-800 dark:text-zinc-200">
                      Awards & Accolades
                    </h3>
                    <div className="space-y-4">
                      {awardsList.map((award, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: idx * 0.05 }}
                          className="relative pl-4 space-y-1"
                        >
                          <div className="absolute left-0 top-1.5 w-2 h-2 rounded-full bg-zinc-900 dark:bg-zinc-100" />
                          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                            <h4 className="font-mono font-medium text-sm text-foreground">
                              {award.title}
                            </h4>
                            {award.dates && (
                              <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400">
                                {award.dates}
                              </span>
                            )}
                          </div>
                          {award.event && (
                            <p className="text-xs font-sans text-zinc-600 dark:text-zinc-400">
                              {award.event}
                            </p>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Microcredentials & Training Section */}
                  <div className="space-y-3">
                    <h3 className="text-base font-mono font-semibold text-zinc-800 dark:text-zinc-200">
                      Microcredentials & Training
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {microcredentialsList.map((item, idx) => {
                        const logos = Array.isArray(item.logo) ? item.logo : [item.logo];
                        return (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.25, delay: idx * 0.02 }}
                            className="p-3 rounded-md border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30 flex items-start gap-3 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors"
                          >
                            <div className="flex -space-x-2 shrink-0 pt-0.5">
                              {logos.map((src, lIdx) => (
                                <div
                                  key={lIdx}
                                  className="w-11 h-11 rounded-md bg-white dark:bg-zinc-800/90 border border-zinc-200/80 dark:border-zinc-700/60 p-1.5 flex items-center justify-center overflow-hidden shrink-0"
                                >
                                  <img
                                    src={src}
                                    alt={`${item.issuer} logo`}
                                    className="w-full h-full object-contain"
                                    loading="lazy"
                                  />
                                </div>
                              ))}
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-mono text-xs font-medium text-foreground leading-snug">
                                {item.title}
                              </h4>
                              <p className="text-[11px] font-sans text-zinc-500 dark:text-zinc-400 mt-0.5">
                                {item.issuer}
                              </p>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </motion.section>
          );
        })}
      </div>
    </div>
  );
}
