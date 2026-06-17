import { faker } from "@faker-js/faker";
import { db } from "../index.ts";
import { experiences } from "../schema/experiences";

export const seedExperiences = async () => {
  try {
    const data = Array.from({ length: 15 }, () => {
      return {
        company: faker.company.name(),

        role: faker.helpers.arrayElement([
          "Frontend Developer",
          "Backend Developer",
          "Full Stack Developer",
          "Software Engineer",
        ]),
        
        description: faker.helpers.arrayElement([
          "Built and maintained scalable web applications using React, TypeScript, and Node.js.",
          "Designed RESTful APIs and optimized PostgreSQL database performance.",
          "Collaborated with cross-functional teams to deliver high-quality software solutions.",
          "Implemented authentication, authorization, and secure API integrations.",
          "Improved application performance and reduced page load times through optimization techniques.",
        ]),
        
        duration: faker.helpers.arrayElement([
          "Jan 2023 - Present",
          "Jun 2022 - Dec 2023",
          "Mar 2021 - May 2022",
          "Jan 2020 - Feb 2021",
        ]),
      };
    });

    return await db
      .insert(experiences)
      .values(data)
      .returning();
  } catch (err) {
    console.log(err.cause || err.message);
  }
};