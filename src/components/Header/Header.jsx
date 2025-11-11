
import React, { useState } from 'react';
// Header uses global CSS classes from styles.css
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
    'ku-header',
    `ku-fixed-${position}`,
    className,
    'klarui-header'
  ].filter(Boolean).join(' ');
  const navStyles = {
    width: WIDTH_MAP[width] || width
  };
  return (
    <header className={headerStyles} data-klarui="true" {...props}>
      <div className="ku-menu-toggle">
        <button
          className="ku-hamburger"
          aria-label="Toggle menu"
          onClick={() => setMobileOpen((open) => !open)}
        >
          <LucideIcons.Menu size={24} />
        </button>
      </div>
      <nav className="ku-menu" style={navStyles} data-open={mobileOpen}>
        <ul className="ku-menu-list">
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
        'ku-menu-item',
        isActive ? 'ku-active' : '',
        isActive && activeClass ? activeClass : '',
        hasSubmenus ? 'ku-has-submenu' : ''
      ].filter(Boolean).join(' ')
    }>
      {item.link ? (
  <a href={item.link} className="ku-menu-link">
          {item.icon && getIcon(item.icon)}
          <span>{item.label}</span>
        </a>
      ) : (
  <span className="ku-menu-link">
          {item.icon && getIcon(item.icon)}
          <span>{item.label}</span>
        </span>
      )}
      {hasSubmenus && (
  <ul className="ku-submenu-list">
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