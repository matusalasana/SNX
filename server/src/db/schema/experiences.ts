import {
  pgTable,
  uuid,
  varchar,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

export const experiences = pgTable(
  "experiences",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    company: varchar("company", {
      length: 150,
    }).notNull(),

    role: varchar("role", {
      length: 150,
    }).notNull(),

    description: text("description")
      .notNull(),

    duration: varchar("duration", {
      length: 100,
    }).notNull(),

    createdAt: timestamp("created_at", {
      withTimezone: true,
    })
      .defaultNow()
      .notNull(),
  }
);