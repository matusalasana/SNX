import { AuthRepository } from './auth.repository';
import { comparePassword, hashPassword, generateToken } from '../../utils/auth';
import { 
  RegisterInput,
  LoginInput
} from "./auth.validation"

const loginUser = async (
  data: LoginInput ) => {
    
  const { username, password_hash } = data;
  
  const user = await AuthRepository.findByUsername(username);
  if (!user) {
    throw new Error('Invalid Credentials. User not found.');
  }

  const isMatch = await comparePassword(password_hash,  user.password_hash
  );
  
  if (!isMatch) {
    throw new Error('Invalid Credentials. Password mismatch.');
  }
  
  const payload = { userId: user.id, username: user.username  }
  const token = await generateToken(payload);
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

const getMe = async (userId: string) => {
  const user = await AuthRepository.findById(userId);
  if (!user) {
    throw new Error('User profiles no longer registered.');
  }
  return user;
};



const register = async (data: RegisterInput) => {
  const { username, email, password_hash } = data;
  
  const exists = await AuthRepository.findByUsername(username);
  
  if(exists){
    throw new Error("User name taken")
  }
  
  if(!username || !email || !password_hash){
    throw new Error("Missing required fields")
  }
  
  const hashed = await hashPassword(password_hash);
  const user = await AuthRepository.register(
    username,
    email,
    hashed
  )
  const payload = { userId: user.id, username: user.username  }
  const token = await generateToken(payload)
  
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
}


export const AuthService = {
  loginUser,
  getMe,
  register
};