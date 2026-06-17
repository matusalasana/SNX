import { seedProjects } from "./projects";
import { seedBlogs } from "./blogs";
import { seedExperiences } from "./experiences";
import { seedMessages } from "./messages";
import { seedSkills } from "./skills";

const seed = async() => {
  try{
    await seedProjects();
    await seedBlogs();
    await seedExperiences();
    await seedMessages();
    await seedSkills();
    
  }catch(err){
    console.log(err.cause || err.message);
  }
};

seed();