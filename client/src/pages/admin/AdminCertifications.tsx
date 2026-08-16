import { useState } from "react";
import { Plus } from "lucide-react";
import { 
  useCertifications,
  useDeleteCertification
} from "../../hooks/certifications";
import { type CertificationFormData } from "../../schema/certifications";
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
  
  if (isLoading) return <p className="subheading p-4">Loading...</p>;

  return (
    <div className="container-custom section space-y-6 bg-background text-content min-h-screen">
      {/* Header */}
      <div className="flex-between items-center mb-10">
        <h1 className="heading text-3xl font-bold">
          Certifications 
        </h1>

        <button
          onClick={openCreate}
          className="btn-primary"
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
