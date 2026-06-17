import { faker } from "@faker-js/faker";
import { db } from "../index.ts";
import { messages } from "../schema/messages";

export const seedMessages = async () => {
  try {
    const data = Array.from({ length: 50 }, () => {
      return {
        name: faker.person.fullName(),

        email: faker.internet.email(),

        subject: faker.helpers.arrayElement([
          "Project Inquiry",
          "Job Opportunity",
          "Collaboration Request",
          "Freelance Work",
          "Portfolio Feedback",
          "Partnership Proposal",
          "Consultation Request",
          "General Question",
        ]),

        message: faker.lorem.paragraphs({
          min: 1,
          max: 3,
        }),

        isRead: faker.datatype.boolean(),
      };
    });

    return await db
      .insert(messages)
      .values(data)
      .returning();
  } catch (err) {
    console.log(err.cause || err.message);
  }
};