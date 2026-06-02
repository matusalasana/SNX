import { dbQuery } from '../../db/client';
import { CreateExperienceInput } from './experiences.validation';

const findAll = async () => {
  const sql = 'SELECT * FROM experiences ORDER BY created_at DESC';
  const result = await dbQuery(sql);
  return result.rows;
};

const findById = async (id: string) => {
  const sql = 'SELECT * FROM experiences WHERE id = $1';
  const result = await dbQuery(sql, [id]);
  return result.rows[0] || null;
};

const create = async (data: CreateExperienceInput) => {
  const sql = 'INSERT INTO experiences (company, role, description, duration) VALUES ($1, $2, $3, $4) RETURNING *';
  const result = await dbQuery(sql, [data.company, data.role, data.description, data.duration]);
  return result.rows[0];
};

const deleteOne = async (id: string) => {
  const sql = 'DELETE FROM experiences WHERE id = $1 RETURNING *';
  const result = await dbQuery(sql, [id]);
  return (result.rowCount ?? 0) > 0;
};

export const ExperiencesRepository = {
  findAll,
  findById,
  create,
  deleteOne
};
