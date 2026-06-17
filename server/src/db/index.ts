
import { DATABASE_URL } from "../configs/env";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

if (!DATABASE_URL) {
  throw new Error("DATABASE_URL is not defined");
}

const sql = neon(DATABASE_URL!);

export const db = drizzle(sql);


export const connectDB = async () => {
  try {
    await db.select();
    console.log(`✅ SNX Database Connected!`);
    return true;
  } catch (err: any) {
    console.log('❌ SNX Database connection failed:', err);
    return false;
  }
};
