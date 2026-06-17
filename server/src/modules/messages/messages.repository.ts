import { db } from "../../db";
import { messages } from "../../db/schema/messages";

import {
  desc,
  eq,
} from "drizzle-orm";

import {
  CreateMessageInput,
} from "./messages.validation";

const findAll = async () => {
  return db
    .select()
    .from(messages)
    .orderBy(desc(messages.createdAt));
};

const findById = async (
  id: string
) => {
  const result = await db
    .select()
    .from(messages)
    .where(eq(messages.id, id));

  return result[0] ?? null;
};

const create = async (
  data: CreateMessageInput
) => {
  const result = await db
    .insert(messages)
    .values({
      name: data.name,
      email: data.email,
      subject: data.subject,
      message: data.message,
    })
    .returning();

  return result[0];
};

const updateReadStatus = async (
  id: string,
  isRead: boolean
) => {
  const result = await db
    .update(messages)
    .set({
      isRead,
    })
    .where(eq(messages.id, id))
    .returning();

  return result[0] ?? null;
};

const deleteOne = async (
  id: string
) => {
  const result = await db
    .delete(messages)
    .where(eq(messages.id, id))
    .returning();

  return result.length > 0;
};

export const MessagesRepository = {
  findAll,
  findById,
  create,
  updateReadStatus,
  deleteOne,
};