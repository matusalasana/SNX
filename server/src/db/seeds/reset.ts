import { sql } from "drizzle-orm";
import { db } from "../index";


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

resetDatabase();