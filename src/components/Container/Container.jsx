import styles from "./Container.module.css";

const Container = ({ children, className = "", ...props }) => {
  return (
    <div className={`${styles.container} ${className}`} {...props}>
      {children}
    </div>
  );
};

Container.displayName = "Container";
export default Container;
