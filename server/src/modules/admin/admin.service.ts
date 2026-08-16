import { AdminRepository } from "./admin.repository";


const getAllBlogs = async () => {
  return await  AdminRepository.getAllBlogs();
};

export const AdminService = {
  getAllBlogs
}