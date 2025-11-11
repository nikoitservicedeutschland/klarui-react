// Layout uses global CSS classes from styles.css

export const Layout = ({
  children,
  showSidebar = false,
  containerWidth = '1200px',
  theme = 'light',
  variant = 'fullwidth',
  className = '',
  ...props
}) => {
  return (
    <div
      className={`ku-layout ku-layout--${theme} ku-layout--${variant} ${showSidebar ? 'ku-with-sidebar' : ''} ${className}`.trim()}
      style={{ maxWidth: containerWidth, margin: '0 auto', padding: '2rem' }}
      {...props}
    >
      {children}
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node,
  showSidebar: PropTypes.bool,
  containerWidth: PropTypes.string,
  theme: PropTypes.string,
  variant: PropTypes.string,
  className: PropTypes.string,
};


Layout.displayName = 'Layout';
export default Layout;
