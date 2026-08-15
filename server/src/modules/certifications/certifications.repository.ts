import { db } from "../../db";
import { certifications }
from "../../db/schema/certifications";

import {
  desc,
  eq,
} from "drizzle-orm";

import {
  CreateCertificationInput,
} from "./certifications.validation";

const findAll = async () => {
  return db
    .select()
    .from(certifications)
    .orderBy(
      desc(certifications.createdAt)
    );
};

const findById = async (
  id: string
) => {
  const result = await db
    .select()
    .from(certifications)
    .where(
      eq(certifications.id, id)
    );

  return result[0] ?? null;
};

const create = async (
  data: CreateCertificationInput
) => {
  const result = await db
    .insert(certifications)
    .values(data)
    .returning();

  return result[0];
};

const updateCertification = async ({
  id,
  certification,
}: {
  id: string;
  certification: Partial<CreateCertificationInput>;
}) => {
  const result = await db
    .update(certifications)
    .set(certification)
    .where(
      eq(certifications.id, id)
    )
    .returning();

  return result[0];
};

const deleteOne = async (
  id: string
) => {
  const result = await db
    .delete(certifications)
    .where(
      eq(certifications.id, id)
    )
    .returning();

  return result.length > 0;
};

export const CertificationsRepository = {
  findAll,
  findById,
  create,
  updateCertification,
  deleteOne,
};