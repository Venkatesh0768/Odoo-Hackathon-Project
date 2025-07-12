export const Card = ({ children, ...props }) => (
  <div className="bg-white rounded-lg shadow p-6" {...props}>{children}</div>
);

export const CardHeader = ({ children }) => <div className="mb-4">{children}</div>;
export const CardContent = ({ children }) => <div>{children}</div>;
export const CardTitle = ({ children }) => <h2 className="text-xl font-bold">{children}</h2>;
export const CardDescription = ({ children }) => <p className="text-gray-500">{children}</p>;
