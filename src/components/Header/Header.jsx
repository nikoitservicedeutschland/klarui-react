
import React, { useState } from 'react';
import styles from './Header.module.css';
import * as LucideIcons from 'lucide-react';

function getIcon(name) {
  const Icon = LucideIcons[name];
  return Icon ? <Icon size={20} /> : null;
}

const WIDTH_MAP = {
  'full': '100%',
  '25': '25%',
  '50': '50%',
  '75': '75%',
  '100': '100%'
};

export const Header = ({
  menuItems = [],
  className = '',
  position = 'top', // top, bottom, left, right
  width = 'full', // full, 25, 50, 75, 100
  activeClass = '', // custom class for active item underline
  ...props
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const headerStyles = [
    styles.header_kui,
    styles[`fixed_${position}`],
    className,
    'klarui-header'
  ].filter(Boolean).join(' ');
  const navStyles = {
    width: WIDTH_MAP[width] || width
  };
  return (
    <header className={headerStyles} data-klarui="true" {...props}>
      <div className={styles.menuToggle_kui}>
        <button
          className={styles.hamburger_kui}
          aria-label="Toggle menu"
          onClick={() => setMobileOpen((open) => !open)}
        >
          <LucideIcons.Menu size={24} />
        </button>
      </div>
      <nav className={styles.menu_kui} style={navStyles} data-open={mobileOpen}>
        <ul className={styles.menuList_kui}>
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
  return (
    <li className={
      [
        styles.menuItem_kui,
        isActive ? styles.active_kui : '',
        isActive && activeClass ? activeClass : '',
        hasSubmenus ? styles.hasSubmenu_kui : ''
      ].filter(Boolean).join(' ')
    }>
      {item.link ? (
        <a href={item.link} className={styles.menuLink_kui}>
          {item.icon && getIcon(item.icon)}
          <span>{item.label}</span>
        </a>
      ) : (
        <span className={styles.menuLink_kui}>
          {item.icon && getIcon(item.icon)}
          <span>{item.label}</span>
        </span>
      )}
      {hasSubmenus && (
        <ul className={styles.submenuList_kui}>
          {item.submenus.map((sub, idx) => (
            <MenuItem key={idx} item={sub} activeClass={activeClass} />
          ))}
        </ul>
      )}
    </li>
  );
}

Header.displayName = 'Header';