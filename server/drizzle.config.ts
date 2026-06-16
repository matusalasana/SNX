import { defineConfig } from "drizzle-kit";
import { DATABASE_URL } from "./src/configs/env.js";

export default defineConfig({
  schema: "./src/db/schema",
  out: "./src/db/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: DATABASE_URL,
  },
});