import { useProjects } from "../../hooks/projects/useProjects";
import { 
  Search, 
  ExternalLink, 
  ChevronDown,
  Briefcase,
  Github,
  Linkedin,
  Twitter,
  FileText
} from 'lucide-react';
import { Skeleton } from "../../utils/skeleton";

const FeaturedProjects = () => {
  const { data: projects=[], isLoading } = useProjects();
  const featured = projects.filter(p => p.featured==true);
  
  if(isLoading){
    return (
      <div className="grid gap-6 md:grid-cols-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="rounded-2xl border border-zinc-800 p-5 space-y-4"
          >
            <Skeleton className="h-48 w-full rounded-xl" />
    
            <div className="flex gap-2 items-center justify-center">
              <Skeleton className="h-8 w-16 rounded-full" />
              <Skeleton className="h-8 w-16 rounded-full" />
              <Skeleton className="h-8 w-20 rounded-full" />
              <Skeleton className="h-8 w-16 rounded-full" />
            </div>
          </div>
        ))}
      </div>
    );
  }
  
  return (
    <div>
      {/* --- WORKS GRID --- */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {projects.map((project) => (
            <div 
              key={project.id} 
              className="group relative flex flex-col rounded-xl border border-gray-800/50 bg-zinc-900/50 overflow-hidden hover:border-gray-800 transition-all duration-300"
            >
              {/* Image Header wrapper using thumbnailUrl fallback */}
              <div className="relative aspect-[16/10] overflow-hidden bg-gray-950">
                <img 
                  src={project.thumbnailUrl} 
                  alt={project.title}
                  className="w-full h-full object-cover opacity-60 mix-blend-luminosity group-hover:opacity-70 group-hover:scale-[1.03] transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111319]/40 to-transparent pointer-events-none" />
              </div>

              {/* Card Meta Content */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-bold tracking-widest text-amber-600 uppercase">
                      {project.category}
                    </span>
                    
                    { (project.liveUrl || project.githubUrl) && (
                      <a 
                        href={project.liveUrl ?? project.githubUrl} 
                        target="_blank"
                        rel="noreferrer"
                        className="text-gray-500 hover:text-white transition-colors" 
                        aria-label={`View ${project.title}`}
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-indigo-300 transition-colors">
                    {project.title}
                  </h3>
                  
                  {/* Gracefully handling null text descriptions */}
                  <p className="text-gray-400 text-xs md:text-sm leading-relaxed mb-6">
                    {project.description ?? "No description provided for this architectural asset."}
                  </p>
                </div>

                {/* Tags bottom container */}
                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-gray-800/40">
                  {project.tags.map((tag, idx) => (
                    <span 
                      key={idx} 
                      className="px-2 py-0.5 text-[10px] tracking-wider font-semibold rounded bg-gray-900/60 border border-gray-800/60 text-gray-400 uppercase"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </section>
    </div>
  )
}

export default FeaturedProjects