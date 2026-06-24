import React from 'react';
import { 
  ArrowUpRight, 
  Code2, 
  Database, 
  Wrench, 
  Mail, 
  ArrowRight, 
  Github, 
  Linkedin, 
  Twitter, 
  FileText,
  Briefcase
} from 'lucide-react';
import Hero from "../../components/home/Hero"
import FeaturedProjects from "../../components/home/FeaturedProjects"
import Skills from "../../components/home/Skills"
import Experiences from "../../components/home/Experiences"
import Certifications from "../../components/home/Certifications"
import RecentBlogs from "../../components/home/RecentBlogs"
import Stats from "../../components/home/Stats"
import CurrentlyWorking from "../../components/home/CurrentlyWorking"
import ContactCTA from "../../components/home/ContactCTA"

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-900">
      <Hero />
      <FeaturedProjects />
      <Skills />
      <Experiences />
      <Certifications />
      <RecentBlogs />
      <Stats />
      <CurrentlyWorking />
      <ContactCTA />
    </div>
  );
}
