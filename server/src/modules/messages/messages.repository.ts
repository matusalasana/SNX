import { dbQuery } from '../../db/client';
import { CreateMessageInput } from './messages.validation';

const findAll = async () => {
  const sql = 'SELECT * FROM contact_messages ORDER BY created_at DESC';
  const result = await dbQuery(sql);
  return result.rows;
};

const findById = async (id: string) => {
  const sql = 'SELECT * FROM contact_messages WHERE id = $1';
  const result = await dbQuery(sql, [id]);
  return result.rows[0] || null;
};

const create = async (data: CreateMessageInput) => {
  const sql = 'INSERT INTO contact_messages (name, email, subject, message) VALUES ($1, $2, $3, $4) RETURNING *';
  const result = await dbQuery(sql, [data.name, data.email, data.subject, data.message]);
  return result.rows[0];
};

const updateReadStatus = async (id: string, isRead: boolean) => {
  const sql = 'UPDATE contact_messages SET is_read = $1 WHERE id = $2 RETURNING *';
  const result = await dbQuery(sql, [isRead, id]);
  return result.rows[0] || null;
};

const deleteOne = async (id: string) => {
  const sql = 'DELETE FROM contact_messages WHERE id = $1 RETURNING *';
  const result = await dbQuery(sql, [id]);
  return (result.rowCount ?? 0) > 0;
};

export const MessagesRepository = {
  findAll,
  findById,
  create,
  updateReadStatus,
  deleteOne
};
