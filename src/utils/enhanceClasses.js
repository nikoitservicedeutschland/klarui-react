// utils/enhanceClasses.js

export const enhanceClasses = (className, styles) => {
  if (!className) return '';
  
  return className
    .split(' ')
    .map(cls => {
      if (styles[cls]) {
        return styles[cls];
      }
      return cls;
    })
    .filter(Boolean)
    .join(' ');
};