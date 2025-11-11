import React, { useState } from 'react';
import * as LucideIcons from 'lucide-react';
import styles from './Header.module.css'; // CSS Module

function getIcon(name) {
  const Icon = LucideIcons[name];
  return Icon ? <Icon size={20} /> : null;
}

const WIDTH_MAP = { full: '100%', '25': '25%', '50': '50%', '75': '75%', '100': '100%' };

export const Header = ({ menuItems = [], className = '', position = 'top', width = 'full', activeClass = '', ...props }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const headerClasses = [
    styles.header,
    position === 'top' ? styles.fixedTop : '',
    position === 'bottom' ? styles.fixedBottom : '',
    position === 'left' ? styles.fixedLeft : '',
    position === 'right' ? styles.fixedRight : '',
    className
  ].filter(Boolean).join(' ');

  const navStyles = { width: WIDTH_MAP[width] || width };

  return (
    <header className={headerClasses} {...props}>
      <div className={styles.menuToggle}>
        <button
          className={styles.hamburger}
          aria-label="Toggle menu"
          onClick={() => setMobileOpen(open => !open)}
        >
          <LucideIcons.Menu size={24} />
        </button>
      </div>
      <nav className={styles.menu} style={navStyles} data-open={mobileOpen}>
        <ul className={styles.menuList}>
          {menuItems.map((item, idx) => (
            <MenuItem key={idx} item={item} activeClass={activeClass} />
          ))}
        </ul>
      </nav>
    </header>
  );
};

function MenuItem({ item, activeClass }) {
  const hasSubmenus = Array.isArray(item.submenus) && item.submenus.length > 0;
  const isActive = !!item.active;

  const itemClasses = [
    styles.menuItem,
    isActive ? styles.active : '',
    hasSubmenus ? styles.hasSubmenu : '',
    isActive && activeClass ? activeClass : ''
  ].filter(Boolean).join(' ');

  return (
    <li className={itemClasses}>
      {item.link ? (
        <a href={item.link} className={styles.menuLink}>
          {item.icon && getIcon(item.icon)}
          <span>{item.label}</span>
        </a>
      ) : (
        <span className={styles.menuLink}>
          {item.icon && getIcon(item.icon)}
          <span>{item.label}</span>
        </span>
      )}
      {hasSubmenus && (
        <ul className={styles.submenuList}>
          {item.submenus.map((sub, idx) => (
            <MenuItem key={idx} item={sub} activeClass={activeClass} />
          ))}
        </ul>
      )}
    </li>
  );
}

Header.displayName = 'Header';
export default Header;
