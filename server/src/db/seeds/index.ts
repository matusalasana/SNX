import { seedProjects } from "./projects";
import { seedBlogs } from "./blogs";
import { seedExperiences } from "./experiences";
import { seedMessages } from "./messages";

const seed = async() => {
  try{
    await seedProjects();
    await seedBlogs();
    await seedExperiences();
    await seedMessages();
    
  }catch(err){
    console.log(err.cause || err.message);
  }
};

seed();