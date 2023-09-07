export const ErrorMessage = (error: any) => {
  return error?.error?.message || "Ooooops something went wrong...";
};
