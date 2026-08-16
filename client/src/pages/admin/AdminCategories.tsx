import { useState } from "react";
import { Plus } from "lucide-react";
import { 
  useCategories,
  useDeleteCategory
} from "../../hooks/categories";
import CategoryForm from "../../components/admin/CategoryForm";
import CategoryCard from "../../components/admin/CategoryCard";
import { type CategoryFormData }  from "../../schema/categories";
import { Skeleton }  from "../../utils/skeleton";

const AdminCategories = () => {
  
  const { data: categories = [], isLoading } = useCategories();
  const { mutate: deleteCategory, isPending } = useDeleteCategory();

  const [isOpen, setIsOpen] = useState(false);
  
  const openModal = () => {
    setIsOpen(true);
  };
  
  const closeModal = () => {
    setIsOpen(false);
  };

  if (isLoading) {
    return (
      <div className="container-custom section space-y-6 bg-background text-content min-h-screen">
  
        <div className="flex-between flex-col sm:flex-row gap-3">
          <Skeleton className="skeleton h-8 w-40" />
          <Skeleton className="skeleton h-10 w-28 rounded-lg" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Skeleton className="skeleton h-40 w-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="container-custom section space-y-6 bg-background text-content min-h-screen">

      {/* Header */}
      <div className="flex-between items-center mb-10">
        <h1 className="heading text-3xl font-bold">
          Categories 
        </h1>

        <button
          onClick={openModal}
          className="btn-primary"
        >
          <Plus className="w-4 h-4" />
          New Category 
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <CategoryCard
            key={category.id}
            name={category.name}
            isDeleting={isPending}
            onDelete={() => deleteCategory(category.id)}
          />
        ))}
      </div>

      {/* Modal */}
      {isOpen && (
        <CategoryForm 
          onSuccess={() => closeModal()} 
        />
      )}

    </div>
  );
};

export default AdminCategories;
