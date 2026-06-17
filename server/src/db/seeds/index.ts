import { seedProjects } from "./projects";
import { seedBlogs } from "./blogs";
import { seedExperiences } from "./experiences";

const seed = async() => {
  try{
    await seedProjects();
    await seedBlogs();
    await seedExperiences();
    
  }catch(err){
    console.log(err.cause || err.message);
  }
};

seed();