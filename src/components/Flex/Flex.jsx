import styles from "./Flex.module.css";

/**
 * Flex Component – Class-based only, no style props
 * Only className and event/data props are allowed
 */
const Flex = ({ children, className = "", ...props }) => {
  return (
    <div className={`${styles.flex} ${className}`} {...props}>
      {children}
    </div>
  );
};

Flex.displayName = "Flex";
export default Flex;
