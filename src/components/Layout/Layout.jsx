import React from 'react';
import PropTypes from 'prop-types';
// Layout uses global CSS classes from styles.css
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
  <div className={`ku-layout ku-layout--${theme} ${showSidebar ? 'ku-with-sidebar' : ''}`} {...props}>
  <header className="ku-layout-header">
        <Header />
      </header>
      <main
        className="ku-layout-body"
        style={{ maxWidth: containerWidth, margin: '0 auto', padding: '2rem' }}
      >
        {children}
      </main>
  <footer className="ku-layout-footer">
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
