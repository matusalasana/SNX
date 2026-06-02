import { neon } from "@neondatabase/serverless"
import { DATABASE_URL } from "./env"

if (!DATABASE_URL) {
  throw new Error("DATABASE_URL is not defined");
}

export const sql = neon(DATABASE_URL);

export const connectDB = async () => {
  try {
    await sql`SELECT NOW()`;
    console.log(`✅ SNX Database Connected!`);
    return true;
  } catch (err) {
    console.log('❌ Database connection failed:', err);
    return false;
  }
};
