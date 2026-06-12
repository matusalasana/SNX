import { Link } from "react-router-dom"
import { ArrowRight } from "lucide-react"
import DownloadResumeBtn from "../common/DownloadResumeBtn"

const Buttons = () => {
  return (
    <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
      <Link
        to="/projects"
        className="group inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-500 px-6 py-3 text-sm font-semibold text-slate-950 transition-all duration-300 hover:bg-cyan-400 hover:shadow-lg hover:shadow-cyan-500/20"
      >
        View Projects
        <ArrowRight
          size={18}
          className="transition-transform duration-300 group-hover:translate-x-1"
        />
      </Link>

      <DownloadResumeBtn />
    </div>
  )
}

export default Buttons