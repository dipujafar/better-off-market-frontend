export const errorModification = (error: any): string => {
  return (
    error?.data?.errorSources?.[0]?.message ||
    error?.data?.message ||
    "Something went wrong. Please try again."
  );
};
