import React from "react";
import styles from "./Stack.module.css";
import { enhanceClasses } from "../../utils/enhanceClasses";

const Stack = ({ children, className = "", ...props }) => {
  const enhanceChildren = (children) => {
    return React. Children.map(children, (child) => {
      if (React. isValidElement(child)) {
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
    <div className={`${styles.stack} ${className}`} {... props}>
      {enhanceChildren(children)}
    </div>
  );
};

Stack. displayName = "Stack";
export default Stack;