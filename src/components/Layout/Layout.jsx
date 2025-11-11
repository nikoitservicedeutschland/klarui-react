import PropTypes from 'prop-types';
import styles from './Layout.module.css';

export const Layout = ({
  children,
  showSidebar = false,
  containerWidth = '1200px',
  theme = 'light',
  variant = 'fullwidth',
  className = '',
  ...props
}) => {
  const classes = [
    styles.kuLayout,
    styles[`kuLayout${theme.charAt(0).toUpperCase() + theme.slice(1)}`],
    showSidebar && styles.kuWithSidebar,
    className
  ].filter(Boolean).join(' ');

  return (
    <div
      className={classes}
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
