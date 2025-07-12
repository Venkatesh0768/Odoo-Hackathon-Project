export const useToast = () => {
  return {
    toast: ({ title, description, variant }) => {
      alert(`${title}\n${description}`);
    }
  };
};
