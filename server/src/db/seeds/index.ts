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
    console.log(`✅ SEEDED ${projects?.length ?? 0} PROJECTS`)
    
    const blogs = await seedBlogs();
    console.log(`✅ SEEDED ${blogs?.length ?? 0} BLOGS`)
    
    const experiences = await seedExperiences();
    console.log(`✅ SEEDED ${experiences?.length ?? 0} EXPERIENCES`)
    
    const messages = await seedMessages();
    console.log(`✅ SEEDED ${messages?.length ?? 0} MESSAGES`)
    
    const skills = await seedSkills();
    console.log(`✅ SEEDED ${skills?.length ?? 0} SKILLS`)
    
  }catch (err: any) {
    console.log(err?.cause || err?.message);
  }
};

seed();