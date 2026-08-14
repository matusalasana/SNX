import {
  uuid,
  varchar,
  text,
  timestamp,
  integer,
  boolean,
  pgTable,
} from "drizzle-orm/pg-core";

import { categories } from "./categories";

export const projects = pgTable("projects", {
  id: uuid("id").defaultRandom().primaryKey(),

  title: varchar("title", { length: 255 }).notNull(),
  
  categoryId: uuid("category_id")
    .references(() => categories.id, { onDelete: 'set null' })
    .notNull(),
    
  content: text("content"),
  
  tags: varchar("tags", { length: 50 })
    .array()
    .notNull()
    .default([]),

  thumbnailUrl: text("thumbnail_url"),
  
  featured: boolean("featured")
    .notNull()
    .default(false),

  description: text("description"),

  order: integer("order").notNull().default(0),

  githubUrl: text("github_url"),

  liveUrl: text("live_url"),

  createdAt: timestamp("created_at")
    .defaultNow()
    .notNull(),

  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull(),
});