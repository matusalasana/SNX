import {
  pgTable,
  uuid,
  varchar,
  integer,
  timestamp,
  check,
} from "drizzle-orm/pg-core";

import { categories } from "./categories";

export const skills = pgTable(
  "skills",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    name: varchar("name", {
      length: 100,
    }).notNull().unique(),

    categoryId: uuid("category_id")
    .references(() => categories.id, { onDelete: 'set null' })
    .notNull(),

    proficiency: varchar("proficiency", {
      length: 100,
    }),

    createdAt: timestamp("created_at")
      .defaultNow()
      .notNull(),
  }
);