import { faker } from "@faker-js/faker";
import { db } from "../index";
import { blogs } from "../schema/blogs";

export const seedBlogs = async () => {
  try {
    const data = Array.from({ length: 50 }, () => {
      return {
        title: faker.lorem.sentence({ min: 3, max: 8 }),

        content: faker.lorem.paragraphs({
          min: 10,
          max: 20,
        }),

        summary: faker.lorem.sentences({
          min: 2,
          max: 4,
        }),

        thumbnailUrl: faker.image.url(),

        status: faker.helpers.arrayElement([
          "published",
          "draft",
        ]),

        readTime: `${faker.number.int({
          min: 3,
          max: 15,
        })} min read`,

        author: faker.person.fullName(),

        tags: faker.helpers.arrayElements(
          [
            "React",
            "TypeScript",
            "JavaScript",
            "Node.js",
            "Express",
            "PostgreSQL",
            "Drizzle ORM",
            "Docker",
            "DevOps",
            "AI",
            "Next.js",
            "Tailwind CSS",
          ],
          {
            min: 1,
            max: 5,
          }
        ),

        category: faker.helpers.arrayElement([
          "Frontend",
          "Backend",
          "Database",
          "DevOps",
          "AI",
          "Career",
          "Tutorial",
        ]),

        featured: faker.datatype.boolean(),
      };
    });

    return await db
      .insert(blogs)
      .values(data)
      .returning();
  } catch (err: any) {
    console.log(err?.cause || err?.message);
  }
};