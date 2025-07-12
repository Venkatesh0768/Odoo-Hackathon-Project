import './badge.css'; // optional, only if using CSS

const Badge = ({ children, variant = 'default', className = '' }) => {
  let base =
    'inline-block px-3 py-1 text-xs font-semibold rounded-full';

  let styles = {
    default: 'bg-gray-100 text-gray-800',
    secondary: 'bg-blue-100 text-blue-700',
    outline: 'border border-gray-300 text-gray-700',
  };

  return (
    <span className={`${base} ${styles[variant]} ${className}`}>
      {children}
    </span>
  );
};

export { Badge };
