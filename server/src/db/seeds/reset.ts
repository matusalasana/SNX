import { sql } from "drizzle-orm";
import { db } from "../index.ts";


export const resetDatabase = async () => {
  await db.execute(sql`
    TRUNCATE TABLE
      projects,
      skills,
      messages,
      experiences,
      blogs
    RESTART IDENTITY CASCADE;
  `);
};

await resetDatabase();