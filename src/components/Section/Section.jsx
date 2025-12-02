import React from "react";
import styles from "./Section.module.css";
import { enhanceClasses } from "../../utils/enhanceClasses";

const Section = ({ 
  children, 
  className = "", 
  variant = "default", 
  ...props 
}) => {
  const enhanceChildren = (children) => {
    return React.Children.map(children, (child) => {
      if (React.isValidElement(child)) {
        const childClassName = child.props.className || '';
        const enhancedClassName = enhanceClasses(childClassName, styles);
        
        return React.cloneElement(child, {
          ...child.props,
          className: enhancedClassName.trim()
        });
      }
      return child;
    });
  };

  return (
    <section
      className={`${styles.section} ${styles[variant]} ${className}`}
      {...props}
    >
      {enhanceChildren(children)}
    </section>
  );
};

Section.displayName = "Section";
export default Section;