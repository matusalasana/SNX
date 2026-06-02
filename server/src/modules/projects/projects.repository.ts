import { sql } from '../../configs/db';
import { CreateProjectInput, UpdateProjectInput } from './projects.validation';

const findAll = async () => {
  const results = await sql `
    SELECT * FROM projects 
    ORDER BY created_at DESC
  `;
  return results || [];
};

const findById = async (id: string) => {
  const result = await sql`
    SELECT * FROM projects 
    WHERE id = ${id}
  `;
  return result[0] || null;
};

const create = async (data: CreateProjectInput) => {
  const {
    title,
    description,
    content,
    thumbnail_url,
    github_url,
    live_url,
    order_index } = data;
  const result = await sql`
    INSERT INTO projects 
      (title, description, content, thumbnail_url, github_url, live_url, order_index)
    VALUES 
      (${title}, ${description}, ${content}, ${thumbnail_url}, ${github_url}, ${live_url}, ${order_index})
    RETURNING *
  `;
  
  return result[0];
};

const update = async (
  id: string, 
  data: UpdateProjectInput ) => {
  const {
    title,
    description,
    content,
    thumbnail_url,
    github_url,
    live_url,
    order_index } = data;
    
  const result = await sql`
    UPDATE projects
    SET title = COALESCE(${title}, title),
        description = COALESCE(${description}, description),
        content = COALESCE(${content}, content),
        thumbnail_url = COALESCE(${thumbnail_url}, thumbnail_url),
        github_url = COALESCE(${github_url}, github_url),
        live_url = COALESCE(${live_url}, live_url),
        order_index = COALESCE(${order_index}, order_index),
        updated_at = CURRENT_TIMESTAMP
    WHERE id = ${id}
    RETURNING *
  `;
  return result[0] || null;
};

const deleteOne = async (id: string) => {
  const result = await sql`
    DELETE FROM projects 
    WHERE id = ${id} 
    RETURNING *
  `;
  return result.length > 0;
};

export const ProjectsRepository = {
  findAll,
  findById,
  create,
  update,
  deleteOne
};