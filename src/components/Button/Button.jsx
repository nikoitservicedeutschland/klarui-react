import styles from './Button.module.css';

/**
 * Button component with multiple variants and sizes
 * 
 * @param {Object} props
 * @param {'primary' | 'secondary' | 'success' | 'warning' | 'error'} props.variant - Button style variant
 * @param {'small' | 'medium' | 'large'} props.size - Button size
 * @param {'none' | 'small' | 'medium' | 'large' | 'full'} props.rounded - Border radius style
 * @param {boolean} props.outline - Use outline style
 * @param {boolean} props.fullWidth - Make button full width
 * @param {boolean} props.disabled - Disable button
 * @param {React.ReactNode} props.children - Button content
 * @param {Function} props.onClick - Click handler
 * @param {'button' | 'submit' | 'reset'} props.type - Button type
 * @param {string} props.className - Additional CSS classes
 * @param {Object} props.style - Inline styles for custom styling
 */
export const Button = ({
  variant = 'primary',
  size = 'medium',
  rounded,
  outline = false,
  fullWidth = false,
  disabled = false,
  children,
  onClick,
  type = 'button',
  className = '',
  style,
  ...rest
}) => {
  const classes = [
    styles.button,
    styles[size],
    styles[variant],
    rounded && styles[`rounded-${rounded}`],
    outline && styles.outline,
    fullWidth && styles.fullWidth,
    className
  ].filter(Boolean).join(' ');

  return (
    <button
      type={type}
      className={classes}
      style={style}
      onClick={onClick}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
};

Button.displayName = 'Button';
