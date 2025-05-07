import PropTypes from "prop-types";

/**
 * Reusable Input component with Tailwind CSS styling
 * @param {Object} props - Component props
 * @param {string} props.label - Input label
 * @param {string} props.type - Input type (text, email, password, etc.)
 * @param {string} props.name - Input name
 * @param {string} props.value - Input value
 * @param {string} props.placeholder - Input placeholder
 * @param {boolean} props.required - Whether input is required
 * @param {boolean} props.disabled - Whether input is disabled
 * @param {string} props.error - Error message to display
 * @param {Function} props.onChange - Change handler function
 * @param {string} props.className - Additional CSS classes
 */
const Input = ({
  label,
  type = "text",
  name,
  value,
  placeholder,
  required = false,
  disabled = false,
  error,
  onChange,
  className = "",
}) => {
  // Base styles for the input container
  const containerStyles = "w-full";

  // Base styles for the label
  const labelStyles = "block text-sm font-medium text-gray-700 mb-1";

  // Base styles for the input
  const inputBaseStyles =
    "w-full px-4 py-2 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";

  // Input state styles
  const inputStateStyles = {
    default: "border-gray-300 focus:border-blue-500 focus:ring-blue-500",
    error: "border-red-500 focus:border-red-500 focus:ring-red-500",
    disabled: "bg-gray-100 cursor-not-allowed",
  };

  // Determine which state styles to apply
  const getInputStyles = () => {
    if (disabled) return inputStateStyles.disabled;
    if (error) return inputStateStyles.error;
    return inputStateStyles.default;
  };

  return (
    <div className={`${containerStyles} ${className}`}>
      {label && (
        <label htmlFor={name} className={labelStyles}>
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        onChange={onChange}
        className={`${inputBaseStyles} ${getInputStyles()}`}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

Input.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default Input;
