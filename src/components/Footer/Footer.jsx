import React from 'react';
import styles from './Footer.module.css';

export const Footer = ({ children, className = '', ...props }) => (
  <footer className={`${styles['ku-footer']} ${className}`} {...props}>
    {children}
  </footer>
);

Footer.displayName = 'Footer';
export default Footer;
