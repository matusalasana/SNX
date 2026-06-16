import {
  pgTable,
  uuid,
  varchar,
  integer,
  timestamp,
  check,
} from "drizzle-orm/pg-core";

import { sql } from "drizzle-orm";

export const skills = pgTable(
  "skills",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    name: varchar("name", {
      length: 100,
    }).notNull(),

    category: varchar("category", {
      length: 50,
    }).notNull(),

    proficiency: integer("proficiency")
      .notNull(),

    iconName: varchar("icon_name", {
      length: 50,
    }),

    createdAt: timestamp("created_at")
      .defaultNow()
      .notNull(),
  }
);