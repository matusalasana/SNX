import { dbQuery } from '../../db/client';
import { CreateBlogInput, UpdateBlogInput } from './blogs.validation';

const findAll = async (includeDrafts = false) => {
  const sql = includeDrafts
    ? 'SELECT * FROM blog_posts ORDER BY created_at DESC'
    : "SELECT * FROM blog_posts WHERE status = 'published' ORDER BY published_at DESC, created_at DESC";
  const result = await dbQuery(sql);
  return result.rows;
};

const findBySlug = async (slug: string) => {
  const sql = 'SELECT * FROM blog_posts WHERE slug = $1';
  const result = await dbQuery(sql, [slug]);
  return result.rows[0] || null;
};

const findById = async (id: string) => {
  const sql = 'SELECT * FROM blog_posts WHERE id = $1';
  const result = await dbQuery(sql, [id]);
  return result.rows[0] || null;
};

const create = async (data: CreateBlogInput) => {
  const publishedAt = data.status === 'published' ? new Date() : null;
  const sql = `
    INSERT INTO blog_posts (title, slug, content, summary, thumbnail_url, status, published_at)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *
  `;
  const params = [
    data.title,
    data.slug,
    data.content,
    data.summary,
    data.thumbnail_url || '',
    data.status,
    publishedAt
  ];
  const result = await dbQuery(sql, params);
  return result.rows[0];
};

const update = async (id: string, data: UpdateBlogInput) => {
  const publishedAt = data.status === 'published' ? new Date() : null;
  const sql = `
    UPDATE blog_posts
    SET title = COALESCE($1, title),
        slug = COALESCE($2, slug),
        content = COALESCE($3, content),
        summary = COALESCE($4, summary),
        thumbnail_url = COALESCE($5, thumbnail_url),
        status = COALESCE($6, status),
        published_at = COALESCE(published_at, $7),
        updated_at = CURRENT_TIMESTAMP
    WHERE id = $8
    RETURNING *
  `;
  const params = [
    data.title !== undefined ? data.title : null,
    data.slug !== undefined ? data.slug : null,
    data.content !== undefined ? data.content : null,
    data.summary !== undefined ? data.summary : null,
    data.thumbnail_url !== undefined ? data.thumbnail_url : null,
    data.status !== undefined ? data.status : null,
    publishedAt,
    id
  ];
  const result = await dbQuery(sql, params);
  return result.rows[0];
};

const deleteOne = async (id: string) => {
  const sql = 'DELETE FROM blog_posts WHERE id = $1 RETURNING *';
  const result = await dbQuery(sql, [id]);
  return (result.rowCount ?? 0) > 0;
};

export const BlogsRepository = {
  findAll,
  findBySlug,
  findById,
  create,
  update,
  deleteOne
};
