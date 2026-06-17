import { AuthRepository } from './auth.repository';
import { comparePassword, hashPassword, generateToken } from '../../utils/auth';
import { 
  RegisterInput,
  LoginInput
} from "./auth.validation"

const loginUser = async (
  data: LoginInput ) => {
    
  const { email, password } = data;
  
  const user = await AuthRepository.findByEmail(email);
  if (!user) {
    throw new Error('Invalid Credentials. User not found.');
  }

  const isMatch = await comparePassword(password,  user.password
  );
  
  if (!isMatch) {
    throw new Error('Invalid Credentials. Password mismatch.');
  }
  
  const payload = { userId: user.id, email: user.email  }
  const token = await generateToken(payload);
  return {
    user,
    token
  };
};

const getMe = async (userId: string) => {
  const user = await AuthRepository.findById(userId);
  if (!user) {
    throw new Error('User profile not found.');
  }
  return user;
};



const register = async (data: RegisterInput) => {
  const { email, password } = data;
  
  const exists = await AuthRepository.findByEmail(email);
  
  if(exists){
    throw new Error("User name taken")
  }
  
  if(!email || !password){
    throw new Error("Missing required fields")
  }
  
  const hashed = await hashPassword(password);
  const user = await AuthRepository.register(
    email,
    hashed
  )
  const payload = { userId: user.id, email: user.email  }
  const token = await generateToken(payload)
  
  return {
    user: {
      id: user.id,
      email: user.email,
      avatar_url: user.avatarUrl,
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