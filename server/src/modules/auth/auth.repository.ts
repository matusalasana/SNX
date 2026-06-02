import { dbQuery } from '../../db/client';

const findByUsername = async (username: string) => {
  const sql = 'SELECT * FROM users WHERE username = $1 LIMIT 1';
  const result = await dbQuery(sql, [username]);
  return result.rows[0] || null;
};

const findById = async (id: string) => {
  const sql = 'SELECT id, username, email, avatar_url, bio FROM users WHERE id = $1 LIMIT 1';
  const result = await dbQuery(sql, [id]);
  return result.rows[0] || null;
};

export const AuthRepository = {
  findByUsername,
  findById
};
