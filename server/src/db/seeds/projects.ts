import { faker } from "@faker-js/faker";
import { db } from "../index.ts";
import { projects } from "../schema/projects";

export const seedProjects = async() => {
  try{
    const data = Array.from({ length: 100 }, () => {
      return {
        title: faker.hacker.adjective(),
        category: faker.helpers.arrayElement([
          "Frontend",
          "Backend",
          "API",
          "Database",
          "DevOps",
          "Other"
        ]),
        tags: faker.helpers.arrayElements(
          [
            "JavaScript",
            "Typescript",
            "Postgresql",
            "ExpressJs",
            "ReactJs",
            "NodeJs",
            "Python",
            "Java",
          ],
          { min: 1, max: 4 }
        ),
        description: faker.lorem.sentence(2),
        thumbnailUrl: faker.image.url(),
        githubUrl: faker.image.url(),
        liveUrl: faker.image.url(),
        order: faker.number.int({ min: 1, max:100}),
      };
    });
  
    return await db.insert(projects).values(data).returning();

  }catch (err) {
    console.log(err.cause || err.message);
  }
};