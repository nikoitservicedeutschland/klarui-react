import styles from "./Section.module.css";

const Section = ({ 
  children, 
  className = "", 
  variant = "default", 
  ...props 
}) => {
  return (
    <section
      className={`${styles.section} ${styles[variant]} ${className}`}
      {...props}
    >
      {children}
    </section>
  );
};

Section.displayName = "Section";
export default Section;
