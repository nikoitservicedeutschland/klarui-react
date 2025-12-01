import styles from "./Column.module.css";

/**
 * Column Component – Class-based only, no style props
 * Only className and event/data props are allowed
 */
const Column = ({ children, className = "", ...props }) => {
  return (
    <div className={`${styles.column} ${className}`} {...props}>
      {children}
    </div>
  );
};

Column.displayName = "Column";
export default Column;
