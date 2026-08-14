
export const getErrorMessage = (error) => {
  return (
    error?.response?.data?.message ||
    error?.message || error?.cause ||
    "Something went wrong, please try again"
  );
};