import React from "react";
import styles from "./Grid.module.css";
import { enhanceClasses } from "../../utils/enhanceClasses";

const Grid = ({ children, className = "", ...props }) => {
  const enhanceChildren = (children) => {
    return React.  Children. map(children, (child) => {
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
    <div className={`${styles.grid} ${className}`} {...props}>
      {enhanceChildren(children)}
    </div>
  );
};

Grid.displayName = "Grid";
export default Grid;