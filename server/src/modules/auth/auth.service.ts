import { AuthRepository } from './auth.repository';
import { comparePassword, generateToken } from '../../utils/auth';

const loginUser = async (usernameStr: string, passwordStr: string) => {
  const user = await AuthRepository.findByUsername(usernameStr);
  if (!user) {
    throw new Error('Invalid login criteria. Access denied.');
  }

  const pinMatch = await comparePassword(passwordStr, user.password_hash);
  if (!pinMatch) {
    throw new Error('Invalid login criteria. Password mismatch.');
  }

  const token = generateToken({ userId: user.id, username: user.username });
  return {
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
      avatar_url: user.avatar_url,
      bio: user.bio
    },
    token
  };
};

const verifyUserById = async (userId: string) => {
  const user = await AuthRepository.findById(userId);
  if (!user) {
    throw new Error('User profiles no longer registered.');
  }
  return user;
};

export const AuthService = {
  loginUser,
  verifyUserById
};
