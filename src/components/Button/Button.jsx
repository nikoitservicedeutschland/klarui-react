import styles from './Button.module.css';

/**
 * Button component with multiple variants and sizes
 * 
 * @param {Object} props
 * @param {'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info'} props.variant - Button style variant
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
const Button = ({
  variant = 'primary',
  size = 'medium',
  rounded = 'medium',
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
    styles['ku-button'],                          // base class
    styles[`ku-button--${variant}`],             // variant class
    styles[`ku-button--${size}`],                // size class
    rounded && styles[`ku-button--rounded-${rounded}`], // rounded class
    outline && styles['ku-button--outline'],     // outline class 
    fullWidth && styles['ku-button--fullWidth'], // full width
    className                                    // any extra classes
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
export default Button;
