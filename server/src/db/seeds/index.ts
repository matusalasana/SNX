import { seedProjects } from "./projects";
import { seedBlogs } from "./blogs";

const seed = async() => {
  try{
    await seedProjects();
    await seedBlogs();
    
  }catch(err){
    console.log(err.cause || err.message);
  }
};

seed();