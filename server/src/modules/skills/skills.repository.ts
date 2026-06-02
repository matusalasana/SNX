import { dbQuery } from '../../db/client';
import { CreateSkillInput, UpdateSkillInput } from './skills.validation';

const findAll = async () => {
  const sql = 'SELECT * FROM skills ORDER BY category ASC, name ASC';
  const result = await dbQuery(sql);
  return result.rows;
};

const findById = async (id: string) => {
  const sql = 'SELECT * FROM skills WHERE id = $1';
  const result = await dbQuery(sql, [id]);
  return result.rows[0] || null;
};

const create = async (data: CreateSkillInput) => {
  const sql = 'INSERT INTO skills (name, category, proficiency, icon_name) VALUES ($1, $2, $3, $4) RETURNING *';
  const result = await dbQuery(sql, [data.name, data.category, data.proficiency, data.icon_name ?? 'Code']);
  return result.rows[0];
};

const deleteOne = async (id: string) => {
  const sql = 'DELETE FROM skills WHERE id = $1 RETURNING *';
  const result = await dbQuery(sql, [id]);
  return (result.rowCount ?? 0) > 0;
};

export const SkillsRepository = {
  findAll,
  findById,
  create,
  deleteOne
};
