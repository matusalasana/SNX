import { AdminRepository } from "./blogs.repository";


const getBlogs = async () => {
  return await  AdminRepository.getBlogs();
};
