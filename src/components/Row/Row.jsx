import React from "react";
import styles from "./Row.module.css";
import { enhanceClasses } from "../../utils/enhanceClasses";

const Row = ({ children, className = "", ...props }) => {
  const enhanceChildren = (children) => {
    return React.Children.map(children, (child) => {
      if (React.isValidElement(child)) {
        const childClassName = child.props.className || '';
        const enhancedClassName = enhanceClasses(childClassName, styles);
        
        return React.cloneElement(child, {
          ...child.props,
          className: `${styles.col} ${enhancedClassName}`.trim()
        });
      }
      return child;
    });
  };

  return (
    <div className={`${styles.row} ${className}`} {...props}>
      {enhanceChildren(children)}
    </div>
  );
};

Row.displayName = "Row";
export default Row;