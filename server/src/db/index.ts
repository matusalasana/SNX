import { neon } from "@neondatabase/serverless";
import { Pool } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";
import { DATABASE_URL } from "../configs/env";

if (!DATABASE_URL) {
  throw new Error("DATABASE_URL is not defined");
}

const pool = new Pool({
  connectionString: DATABASE_URL!,
});

export const db = drizzle(pool);


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