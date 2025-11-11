import React from 'react';
import PropTypes from 'prop-types';
import styles from './Layout.module.css';
import Header from '../Header';
import Footer from '../Footer';

export const Layout = ({
  children,
  showSidebar = false,
  containerWidth = '1200px',
  theme = 'light',
  ...props
}) => {
  return (
    <div className={`${styles['ku-layout']} ${styles[`ku-layout--${theme}`] || ''} ${showSidebar ? styles['ku-with-sidebar'] : ''}`} {...props}>
      <header className={styles['ku-layout-header']}>
        <Header />
      </header>
      <main
        className={styles['ku-layout-body']}
        style={{ maxWidth: containerWidth, margin: '0 auto', padding: '2rem' }}
      >
        {children}
      </main>
      <footer className={styles['ku-layout-footer']}>
        <Footer />
      </footer>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node,
  showSidebar: PropTypes.bool,
  containerWidth: PropTypes.string,
  theme: PropTypes.string,
};


Layout.displayName = 'Layout';
export default Layout;
