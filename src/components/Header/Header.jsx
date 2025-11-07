import React from 'react';
import styles from './Header.module.css';
import * as LucideIcons from 'lucide-react';

function getIcon(name) {
  const Icon = LucideIcons[name];
  return Icon ? <Icon size={20} /> : null;
}

export const Header = ({ menuItems = [], className = '', ...props }) => (
  <header className={styles.header_kui + ' ' + className} {...props}>
    <nav className={styles.menu_kui}>
      <ul className={styles.menuList_kui}>
        {menuItems.map((item, idx) => (
          <MenuItem key={idx} item={item} />
        ))}
      </ul>
    </nav>
  </header>
);

function MenuItem({ item }) {
  const hasSubmenus = Array.isArray(item.submenus) && item.submenus.length > 0;
  const isActive = !!item.active;
  return (
    <li className={
      `${styles.menuItem_kui} ${isActive ? styles.active_kui : ''} ${hasSubmenus ? styles.hasSubmenu_kui : ''}`
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
            <MenuItem key={idx} item={sub} />
          ))}
        </ul>
      )}
    </li>
  );
}

Header.displayName = 'Header';