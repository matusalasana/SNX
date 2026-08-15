import {
  pgTable,
  uuid,
  varchar,
  text,
  date,
  timestamp,
} from "drizzle-orm/pg-core";

export const certifications = pgTable("certifications", {
  
  id: uuid("id").defaultRandom().primaryKey(),

  name: varchar("name", { length: 255 }).notNull(),

  issuer: varchar("issuer", { length: 255 }).notNull(),

  description: text("description"),

  issueDate: varchar("issue_date", {
    length: 7,
  }).notNull(),

  credentialId: varchar("credential_id", { length: 255 }),

  credentialUrl: text("credential_url"),

  createdAt: timestamp("created_at")
    .defaultNow()
    .notNull(),

  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull(),
});