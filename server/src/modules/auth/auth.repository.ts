import { sql } from '../../configs/db';

const findByUsername = async (
  username: string ) => {
  const result = await sql`
    SELECT * FROM users 
    WHERE username = ${username}
  `;
  return result[0] || null;
};

const findById = async (id: string) => {
  const result = await sql`
    SELECT 
      id, 
      username, 
      email, 
      avatar_url, 
      bio FROM users 
    WHERE id = ${id}
  `;
  return result[0] || null;
};


const register = async(
  username,
  email,
  hashedPassword
) => {
  
  const result = await sql`
    INSERT INTO users (
      username,
      email,
      password_hash
    )
    VALUES (
      ${username},
      ${email},
      ${hashedPassword}
    )
    RETURNING id, email, username, avatar_url, bio
  `
  return result[0] || null;
}

export const AuthRepository = {
  findByUsername,
  findById,
  register
};
