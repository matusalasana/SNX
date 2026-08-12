import {
  pgTable,
  uuid,
  varchar,
  text,
  timestamp,
  boolean,
} from "drizzle-orm/pg-core";

import { categories } from "./categories";

export const blogs = pgTable("blogs", {
  id: uuid("id").defaultRandom().primaryKey(),

  title: varchar("title", {
    length: 255,
  }).notNull(),

  content: text("content").notNull(),

  thumbnailUrl: text("thumbnail_url"),

  status: varchar("status", {
    length: 100,
    enum: ["published", "draft"],
  })
    .notNull()
    .default("draft"),

  readTime: varchar("read_time", {
    length: 255,
  }).notNull(),

  tags: text("tags")
    .array()
    .notNull()
    .default([]),

  categoryId: uuid("category_id")
    .references(() => categories.id, { onDelete: 'set null' })
    .notNull(),

  featured: boolean("featured")
    .notNull()
    .default(false),

  createdAt: timestamp("created_at")
    .defaultNow()
    .notNull(),

  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull(),
});