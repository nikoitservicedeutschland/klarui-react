import React, { useState } from 'react';
import * as LucideIcons from 'lucide-react';
import styles from './Header.module.css';

function getIcon(name) {
  const Icon = LucideIcons[name];
  return Icon ? <Icon size={20} /> : null;
}

const WIDTH_MAP = { full: '100%', '25': '25%', '50': '50%', '75': '75%', '100': '100%' };

export const Header = ({
  logo = null, // ReactNode: متن یا تصویر
  menuItems = [],
  className = '',
  position = 'top',
  width = 'full',
  activeClass = '',
  ...props
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const headerClasses = [
    styles['ku-header'],
    position === 'top' ? styles['ku-fixedTop'] : '',
    position === 'bottom' ? styles['ku-fixedBottom'] : '',
    position === 'left' ? styles['ku-fixedLeft'] : '',
    position === 'right' ? styles['ku-fixedRight'] : '',
    className
  ].filter(Boolean).join(' ');

  const navStyles = { width: WIDTH_MAP[width] || width };

  return (
    <header className={headerClasses} {...props}>
      <div className={styles['ku-headerContent']}>
        {logo && <div className={styles['ku-logo']}>{logo}</div>}
        <div className={styles['ku-menuToggle']}>
          <button
            className={styles['ku-hamburger']}
            aria-label="Toggle menu"
            onClick={() => setMobileOpen(open => !open)}
          >
            <LucideIcons.Menu size={24} />
          </button>
        </div>
        <nav
          className={`${styles['ku-menu']} ${mobileOpen ? styles['ku-menuOpen'] : ''}`}
          style={navStyles}
        >
          <ul className={styles['ku-menuList']}>
            {menuItems.map((item, idx) => (
              <MenuItem key={idx} item={item} activeClass={activeClass} />
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

function MenuItem({ item, activeClass }) {
  const hasSubmenus = Array.isArray(item.submenus) && item.submenus.length > 0;
  const isActive = !!item.active;

  const itemClasses = [
    styles['ku-menuItem'],
    isActive ? styles['ku-active'] : '',
    hasSubmenus ? styles['ku-hasSubmenu'] : '',
    isActive && activeClass ? activeClass : ''
  ].filter(Boolean).join(' ');

  return (
    <li className={itemClasses}>
      {item.link ? (
        <a href={item.link} className={styles['ku-menuLink']}>
          {item.icon && getIcon(item.icon)}
          <span>{item.label}</span>
        </a>
      ) : (
        <span className={styles['ku-menuLink']}>
          {item.icon && getIcon(item.icon)}
          <span>{item.label}</span>
        </span>
      )}
      {hasSubmenus && (
        <ul className={styles['ku-submenuList']}>
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
