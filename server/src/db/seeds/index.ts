import { seedProjects } from "./projects";
import { seedBlogs } from "./blogs";
import { seedExperiences } from "./experiences";
import { seedMessages } from "./messages";
import { seedSkills } from "./skills";
import { resetDatabase } from "./reset";

const seed = async() => {
  try{
    
    await resetDatabase();
    console.log("✅ DATABASE RESET SUCCESSFULLY")
    
    const projects = await seedProjects();
    console.log(`✅ SEEDED ${projects.length} PROJECTS`)
    
    const blogs = await seedBlogs();
    console.log(`✅ SEEDED ${blogs.length} BLOGS`)
    
    const experiences = await seedExperiences();
    console.log(`✅ SEEDED ${experiences.length} EXPERIENCES`)
    
    const messages = await seedMessages();
    console.log(`✅ SEEDED ${messages.length} MESSAGES`)
    
    const skills = await seedSkills();
    console.log(`✅ SEEDED ${skills.length} SKILLS`)
    
  }catch(err){
    console.log(err.cause || err.message);
  }
};

seed();