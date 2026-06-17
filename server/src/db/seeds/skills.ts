import { faker } from "@faker-js/faker";
import { db } from "../index.ts";
import { skills } from "../schema/skills";

export const seedSkills = async () => {
  try {
    const data = Array.from({ length: 30 }, () => {
      const skill = faker.helpers.arrayElement([
        {
          name: "React",
          category: "Frontend",
          iconName: "react",
        },
        {
          name: "TypeScript",
          category: "Frontend",
          iconName: "typescript",
        },
        {
          name: "JavaScript",
          category: "Frontend",
          iconName: "javascript",
        },
        {
          name: "Next.js",
          category: "Frontend",
          iconName: "nextjs",
        },
        {
          name: "Tailwind CSS",
          category: "Frontend",
          iconName: "tailwind",
        },
        {
          name: "Node.js",
          category: "Backend",
          iconName: "nodejs",
        },
        {
          name: "Express.js",
          category: "Backend",
          iconName: "express",
        },
        {
          name: "PostgreSQL",
          category: "Database",
          iconName: "postgresql",
        },
        {
          name: "Drizzle ORM",
          category: "Database",
          iconName: "drizzle",
        },
        {
          name: "Docker",
          category: "DevOps",
          iconName: "docker",
        },
        {
          name: "Git",
          category: "Tools",
          iconName: "git",
        },
        {
          name: "GitHub",
          category: "Tools",
          iconName: "github",
        },
      ]);

      return {
        ...skill,
        proficiency: faker.number.int({
          min: 50,
          max: 100,
        }),
      };
    });

    return await db
      .insert(skills)
      .values(data)
      .returning();
  } catch (err) {
    console.log(err.cause || err.message);
  }
};