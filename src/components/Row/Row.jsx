import styles from "./Row.module.css";

/**
 * Row Component – Mobile First Grid Container
 * Only class-based, no style props
 */
const Row = ({ children, className = "", ...props }) => {
  return (
    <div className={`${styles.row} ${className}`} {...props}>
      {children}
    </div>
  );
};

Row.displayName = "Row";
export default Row;
