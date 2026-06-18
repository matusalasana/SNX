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
import RecentBlogs from "../../components/home/RecentBlogs"
import Stats from "../../components/home/Stats"
import CurrentlyWorking from "../../components/home/CurrentlyWorking"
import ContactCTA from "../../components/home/ContactCTA"

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0B0D13] text-[#F3F4F6] font-sans antialiased selection:bg-indigo-500/30 px-3 lg:px-10">
      <Hero />
      <FeaturedProjects />
      <Skills />
      <Experiences />
      <RecentBlogs />
      <Stats />
      <CurrentlyWorking />
      <ContactCTA />
    </div>
  );
}
