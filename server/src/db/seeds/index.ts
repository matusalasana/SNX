import { seedProjects } from "./projects";

const seed = async() => {
  try{
    await seedProjects();
    
  }catch(err){
    console.log(err.cause || err.message);
  }
};

seed();