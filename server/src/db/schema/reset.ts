import { sql } from "drizzle-orm";
import { db } from "../index";


export const resetSchema = async () => {
  await db.execute(sql`
    DROP SCHEMA IF EXISTS public CASCADE;
    CREATE SCHEMA public;
  `);
  
  console.log("Schema dropped successfully")
};

resetSchema();