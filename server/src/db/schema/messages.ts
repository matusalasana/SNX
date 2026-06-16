import {
  pgTable,
  uuid,
  varchar,
  text,
  boolean,
  timestamp
} from "drizzle-orm/pg-core";

export const messages = pgTable(
  "messages",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    name: varchar("name", {
      length: 150,
    }).notNull(),

    email: varchar("email", {
      length: 255,
    }).notNull(),

    subject: varchar("subject", {
      length: 255,
    }).notNull(),

    message: text("message")
      .notNull(),

    isRead: boolean("is_read")
      .notNull()
      .default(false),

    createdAt: timestamp("created_at", {
      withTimezone: true,
    })
      .defaultNow()
      .notNull(),
  }
);