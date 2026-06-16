import { db } from "../../db";
import { users } from "../../db/schema/users";

import { eq } from "drizzle-orm";

const findByEmail = async (
  email: string
) => {
  const result = await db
    .select()
    .from(users)
    .where(eq(users.email, email));

  return result[0] ?? null;
};

const findById = async (
  id: string
) => {
  const result = await db
    .select({
      id: users.id,
      email: users.email,
      avatarUrl: users.avatarUrl,
      bio: users.bio,
    })
    .from(users)
    .where(eq(users.id, id));

  return result[0] ?? null;
};

const register = async (
  email: string,
  hashedPassword: string
) => {
  const result = await db
    .insert(users)
    .values({
      email,
      password: hashedPassword,
      bio: "",
    })
    .returning({
      id: users.id,
      email: users.email,
      avatarUrl: users.avatarUrl,
      bio: users.bio,
    });

  return result[0] ?? null;
};

export const AuthRepository = {
  findByEmail,
  findById,
  register,
};