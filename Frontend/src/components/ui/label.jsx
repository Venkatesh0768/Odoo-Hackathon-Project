export const Label = ({ children, ...props }) => (
  <label className="block font-medium text-sm text-gray-700 mb-1" {...props}>
    {children}
  </label>
);