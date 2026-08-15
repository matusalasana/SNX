import { Download } from "lucide-react";

const DownloadResumeBtn = () => {
  return (
    <a
      href="/Sana_Matusala_Resume.pdf"
      download="Sana_Matusala_Resume.pdf"
      className="btn-outline group"
    >
      <Download
        size={18}
        className="transition-transform duration-300 group-hover:-translate-y-0.5"
      />
      Download Resume
    </a>
  );
};

export default DownloadResumeBtn;