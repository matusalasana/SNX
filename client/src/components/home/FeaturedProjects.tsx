import { useProjects } from "../../hooks/projects/useProjects"
import { ArrowUpRight } from "lucide-react";
import LoadingSkeleton from "./LoadingSkeleton";

const FeaturedProjects = () => {
  const { data: projects=[], isLoading } = useProjects();
  const featured = projects.filter(p => p.featured==true);
  
  if(isLoading){
    return <LoadingSkeleton className="max-w-5xl mx-auto px-6 py-16 border-t border-gray-900" />
  }
  return (
    <div>
      <section id="projects" className="max-w-5xl mx-auto px-6 py-16 border-t border-gray-900">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">Selected Works</h2>
            <p className="text-gray-400 text-sm">Engineering solutions for complex problems.</p>
          </div>
          <a href="#" className="group inline-flex items-center gap-1.5 text-xs font-semibold text-gray-400 hover:text-white uppercase tracking-wider transition-colors">
            View Archive 
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featured.map((project, index) => (
            <div key={index} className="group relative rounded-lg border border-gray-800/60 bg-[#111319]/40 overflow-hidden hover:border-gray-700/80 transition-all flex flex-col justify-end h-80 p-6">
              {/* Background Cover Image with Overlay */}
              <div 
                className="absolute inset-0 bg-cover bg-center mix-blend-luminosity opacity-20 group-hover:scale-[1.02] group-hover:opacity-30 transition-all duration-500" 
                style={{ backgroundImage: `url(${project.image})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D13] via-[#0B0D13]/70 to-transparent pointer-events-none" />

              {/* Card Contents */}
              <div className="relative z-10">
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-indigo-300 transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-400 text-xs md:text-sm leading-relaxed max-w-sm">
                  {project.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default FeaturedProjects