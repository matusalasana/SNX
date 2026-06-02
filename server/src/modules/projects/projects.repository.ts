import { dbQuery } from '../../db/client';
import { CreateProjectInput, UpdateProjectInput } from './projects.validation';

const findAll = async () => {
  const sql = 'SELECT * FROM projects ORDER BY order_index ASC, created_at DESC';
  const result = await dbQuery(sql);
  return result.rows;
};

const findById = async (id: string) => {
  const sql = 'SELECT * FROM projects WHERE id = $1';
  const result = await dbQuery(sql, [id]);
  return result.rows[0] || null;
};

const create = async (data: CreateProjectInput) => {
  const sql = `
    INSERT INTO projects (title, description, content, thumbnail_url, github_url, live_url, order_index)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *
  `;
  const params = [
    data.title,
    data.description,
    data.content ?? '',
    data.thumbnail_url || '',
    data.github_url || '',
    data.live_url || '',
    data.order_index || 0
  ];
  const result = await dbQuery(sql, params);
  return result.rows[0];
};

const update = async (id: string, data: UpdateProjectInput) => {
  const sql = `
    UPDATE projects
    SET title = COALESCE($1, title),
        description = COALESCE($2, description),
        content = COALESCE($3, content),
        thumbnail_url = COALESCE($4, thumbnail_url),
        github_url = COALESCE($5, github_url),
        live_url = COALESCE($6, live_url),
        order_index = COALESCE($7, order_index),
        updated_at = CURRENT_TIMESTAMP
    WHERE id = $8
    RETURNING *
  `;
  const params = [
    data.title !== undefined ? data.title : null,
    data.description !== undefined ? data.description : null,
    data.content !== undefined ? data.content : null,
    data.thumbnail_url !== undefined ? data.thumbnail_url : null,
    data.github_url !== undefined ? data.github_url : null,
    data.live_url !== undefined ? data.live_url : null,
    data.order_index !== undefined ? data.order_index : null,
    id
  ];
  const result = await dbQuery(sql, params);
  return result.rows[0];
};

const deleteOne = async (id: string) => {
  const sql = 'DELETE FROM projects WHERE id = $1 RETURNING *';
  const result = await dbQuery(sql, [id]);
  return (result.rowCount ?? 0) > 0;
};

export const ProjectsRepository = {
  findAll,
  findById,
  create,
  update,
  deleteOne
};
