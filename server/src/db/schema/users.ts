import { 
  uuid,
  varchar,
  text,
  timestamp,
  pgTable } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),

  email: varchar("email", { length: 255 })
    .notNull()
    .unique(),

  password: text("password").notNull(),

  bio: text("bio").notNull(),
  
  avatarUrl: text("avatar_url"),

  createdAt: timestamp("created_at")
    .defaultNow()
    .notNull(),

  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull(),
});