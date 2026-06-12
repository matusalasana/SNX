import { Download } from "lucide-react";

const DownloadResumeBtn = () => {
  return (
    <a
      href="/Sana_Matusala_Resume.pdf"
      download="Sana_Matusala_Resume.pdf"
      className="flex items-center gap-2 rounded-xl border border-slate-700 px-6 py-4 transition hover:border-cyan-400"
    >
      <Download size={18} />
      Download Resume
    </a>
  )
}

export default DownloadResumeBtn