import { Download } from "lucide-react"

const DownloadResumeBtn = () => {
  return (
    <a
      href="/Sana_Matusala_Resume.pdf"
      download="Sana_Matusala_Resume.pdf"
      className="group inline-flex items-center justify-center gap-2 rounded-xl border border-slate-800 bg-slate-900/30 px-6 py-3 text-sm font-medium text-slate-200 backdrop-blur-md transition-all duration-300 hover:border-cyan-400/60 hover:text-white hover:bg-slate-900/50"
    >
      <Download
        size={18}
        className="transition-transform duration-300 group-hover:-translate-y-0.5"
      />
      Download Resume
    </a>
  )
}

export default DownloadResumeBtn