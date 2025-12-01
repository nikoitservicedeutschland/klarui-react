import styles from "./Stack.module.css";

/**
 * Stack Component – vertical or horizontal stacking
 * Class-based only, no style props
 */
const Stack = ({ children, className = "", ...props }) => {
  return (
    <div className={`${styles.stack} ${className}`} {...props}>
      {children}
    </div>
  );
};

Stack.displayName = "Stack";
export default Stack;
