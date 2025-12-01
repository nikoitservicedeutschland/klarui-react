import styles from "./Wrapper.module.css";

const Wrapper = ({ children, className = "default", ...props }) => {
  return (
    <div className={`${styles.wrapper} ${styles[className]}`} {...props}>
      {children}
    </div>
  );
};

Wrapper.displayName = "Wrapper";
export default Wrapper;
