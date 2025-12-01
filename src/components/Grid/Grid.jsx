import styles from "./Grid.module.css";

/**
 * Grid Component – Class-based, Mobile-First, Responsive
 * Props only for children or event handling
 */
const Grid = ({ children, className = "", ...props }) => {
  return (
    <div className={`${styles.grid} ${className}`} {...props}>
      {children}
    </div>
  );
};

Grid.displayName = "Grid";
export default Grid;
