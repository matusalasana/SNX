import {
  pgTable,
  uuid,
  text,
  integer,
  timestamp,
} from "drizzle-orm/pg-core";

import { projects } from "./projects";

export const projectImages = pgTable(
  "project_images",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    projectId: uuid("project_id")
      .notNull()
      .references(() => projects.id, {
        onDelete: "cascade",
      }),

    imageUrl: text("image_url").notNull(),

    order: integer("order")
      .notNull()
      .default(0),

    createdAt: timestamp("created_at")
      .defaultNow()
      .notNull(),
  }
);