import { useState } from "react";
import { Plus } from "lucide-react";
import { 
  useCertifications,
  useDeleteCertification
} from "../../hooks/certifications";
import { type CertificationFormData } from "../../schema/certifications"
import CertificationCard from "../../components/admin/CertificationCard";
import CertificationForm from "../../components/admin/CertificationForm";

const AdminCertifications = () => {
  const { data: certifications = [], isLoading } = useCertifications();
  const { mutate: deleteCertification, isPending } = useDeleteCertification();

  const [selected, setSelected] = useState<CertificationFormData | null>(null);
  const [formMode, setFormMode] = useState<"create" | "edit" | null>(null);
  
  const openCreate = () => {
    setSelected(null);
    setFormMode("create");
  };
  
  const openEdit = (certifications: CertificationFormData) => {
    setSelected(certifications);
    setFormMode("edit");
  };
  
  const closeModal = () => {
    setSelected(null);
    setFormMode(null);
  };
  
  if (isLoading) return <p className="text-amber-600">Loading...</p>;

  return (
    <div className="p-4 space-y-4 bg-amber-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-3xl font-bold text-amber-400">
          Certifications 
        </h1>

        <button
          onClick={openCreate}
          className="btn btn-primary"
        >
          <Plus className="w-4 h-4" />
          New Certification
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certifications.map((certification) => (
          <CertificationCard
            key={certification.id}
            name={certification.name}
            issuer={certification.issuer}
            description={certification.description}
            issueDate={certification.issueDate}
            credentialUrl={certification.credentialUrl}
            isDeleting={isPending}
            onEdit={() => openEdit(certification)}
            onDelete={() => deleteCertification(certification.id)}
          />
        ))}
      </div>

      {/* Modal */}
      {formMode && (
        <div className="container-custom">
        <CertificationForm
          mode={formMode}
          onSuccess={() => closeModal()}
          certification={selected ?? undefined}
        />
        </div>
      )}
    </div>
  );
};

export default AdminCertifications;