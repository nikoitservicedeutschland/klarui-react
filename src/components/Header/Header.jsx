import React, { useState, useEffect, useRef, useCallback } from "react";
import * as LucideIcons from "lucide-react";
import styles from "./Header.module.css";

// Helper to get icon from lucide-react
function getIcon(name, size = 20) {
  const Icon = LucideIcons[name];
  return Icon ? <Icon size={size} /> : null;
}

// Search Component (Optional)
const SearchBox = ({ onSearch, placeholder = "Search.. .", className = "" }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (value) => {
    setSearchTerm(value);
    onSearch?.(value);
  };

  return (
    <div className={`${styles.searchContainer} ${className}`}>
      <div className={styles.searchBox}>
        <LucideIcons.Search size={18} className={styles.searchIcon} />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder={placeholder}
          className={styles.searchInput}
        />
        {searchTerm && (
          <button
            onClick={() => handleSearch("")}
            className={styles. searchClear}
            aria-label="Clear search"
          >
            <LucideIcons.X size={16} />
          </button>
        )}
      </div>
    </div>
  );
};

// Main Header Component
const Header = ({
  logo = null,
  menuItems = [],
  activeItem = null,
  searchPlaceholder = "Search menu...",
  enableSearch = false,
  enableKeyboardNav = true,
  enableAnalytics = false,
  onMenuClick = null,
  onSearch = null,
  theme = "auto",
  className = "",
  ... props
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const [openSubmenus, setOpenSubmenus] = useState([]);
  const headerRef = useRef(null);

  const processMenuItems = (items) => {
    if (!activeItem) return items;
    
    return items.map(item => {
      const isItemActive = activeItem === item.label;
      const hasActiveSubmenu = item.submenus?. some(sub => 
        activeItem === sub.label || 
        sub.submenus?.some(subsub => activeItem === subsub.label)
      );
      
      return {
        ...item,
        active: isItemActive || hasActiveSubmenu,
        submenus: item.submenus?. map(sub => ({
          ... sub,
          active: activeItem === sub.label || sub. submenus?.some(subsub => activeItem === subsub.label),
          submenus: sub.submenus?.map(subsub => ({
            ...subsub,
            active: activeItem === subsub. label
          }))
        }))
      };
    });
  };

  const processedMenuItems = processMenuItems(menuItems);
  
  const filteredMenuItems = searchTerm
    ? processedMenuItems.filter((item) =>
        item.label.toLowerCase(). includes(searchTerm.toLowerCase()) ||
        (item.submenus?.some(sub => 
          sub.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
          sub. submenus?.some(subsub => 
            subsub.label.toLowerCase().includes(searchTerm.toLowerCase())
          )
        ))
      )
    : processedMenuItems;

  const handleKeyDown = useCallback((e) => {
    if (! enableKeyboardNav) return;

    if (e.key === "Escape") {
      setMobileOpen(false);
      setSearchTerm("");
      setOpenSubmenus([]);
    }
    
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setFocusedIndex(prev => 
        prev < filteredMenuItems.length - 1 ? prev + 1 : 0
      );
    }
    
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setFocusedIndex(prev => 
        prev > 0 ? prev - 1 : filteredMenuItems.length - 1
      );
    }
  }, [enableKeyboardNav, filteredMenuItems. length]);

  const handleSearch = (value) => {
    setSearchTerm(value);
    onSearch?.(value, filteredMenuItems);
  };

const handleSubmenuToggle = (menuPath) => {
  if (menuPath === 'CLOSE_ALL') {
    setOpenSubmenus([]);
    return;
  }

  setOpenSubmenus(prev => {
    const isOpen = prev.includes(menuPath);
    const level = menuPath.split('-'). length;
    
    if (isOpen) {
      return prev.filter(path => !path. startsWith(menuPath));
    }
    
    if (level === 1) {
      return prev.filter(path => path. includes('-')).concat([menuPath]);
    } else {
      return [...prev, menuPath];
    }
  });
};

  const trackMenuClick = (item, level = 1) => {
    if (enableAnalytics && typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'menu_click', {
        menu_item: item.label,
        menu_level: level,
        menu_link: item.link || 'no-link'
      });
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (headerRef. current && !headerRef.current. contains(event.target)) {
        setMobileOpen(false);
        setOpenSubmenus([]);
      }
    };

    if (mobileOpen) {
      document. addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [mobileOpen, handleKeyDown]);

  const headerClasses = [
    styles.header,
    className
  ].filter(Boolean).join(" ");

  return (
    <header 
      ref={headerRef}
      className={headerClasses} 
      data-theme={theme}
      {... props}
    >
      <div className={styles.container}>
        {logo && (
          <div className={styles.logo}>
            {logo}
          </div>
        )}

        {enableSearch && (
          <div className={styles.searchDesktop}>
            <SearchBox
              onSearch={handleSearch}
              placeholder={searchPlaceholder}
            />
          </div>
        )}

        <button
          className={styles.burger}
          aria-label="Toggle navigation menu"
          onClick={() => setMobileOpen(prev => !prev)}
          aria-expanded={mobileOpen}
          aria-controls="main-menu"
        >
          {mobileOpen ? (
            <LucideIcons.X size={24} />
          ) : (
            <LucideIcons.Menu size={24} />
          )}
        </button>

        <nav 
          className={`${styles.menu} ${mobileOpen ? styles. menuOpen : ""}`}
          role="navigation"
          aria-label="Main navigation"
          id="main-menu"
        >
          {enableSearch && (
            <div className={styles.searchMobile}>
              <SearchBox
                onSearch={handleSearch}
                placeholder={searchPlaceholder}
              />
            </div>
          )}

          <div className={styles.pullTab}></div>

          <ul className={styles.menuList} role="menubar">
            {filteredMenuItems.map((item, idx) => (
              <MenuItem 
                key={`${item.label}-${idx}`}
                item={item} 
                onClose={() => setMobileOpen(false)}
                onMenuClick={onMenuClick}
                trackClick={trackMenuClick}
                isFocused={focusedIndex === idx}
                level={1}
                openSubmenus={openSubmenus}
                onSubmenuToggle={handleSubmenuToggle}
                parentPath=""
              />
            ))}
          </ul>

          {searchTerm && filteredMenuItems.length === 0 && (
            <div className={styles.noResults}>
              <LucideIcons.Search size={24} />
              <p>No menu items found for "{searchTerm}"</p>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

// ✅ MenuItem کامپوننت اصلاح شده
const MenuItem = ({ 
  item, 
  onClose, 
  onMenuClick,
  trackClick,
  isFocused = false,
  level = 1,
  openSubmenus = [],
  onSubmenuToggle,
  parentPath = ""
}) => {
  const hasSubmenus = Array.isArray(item.submenus) && item.submenus.length > 0;
  const isActive = !!item.active;
  const itemPath = parentPath ? `${parentPath}-${item.label}` : item.label;
  const submenuOpen = openSubmenus.includes(itemPath);
  const [isLoading, setIsLoading] = useState(false);
  const menuItemRef = useRef(null);

  useEffect(() => {
    if (isFocused && menuItemRef. current) {
      menuItemRef.current.focus();
    }
  }, [isFocused]);

 const handleMenuClick = async (e) => {
  trackClick?.(item, level);
  
  if (hasSubmenus) {
    e.preventDefault();
    onSubmenuToggle?.(itemPath);
    return;
  }

  if (level === 1) {
    onSubmenuToggle?. ('CLOSE_ALL');
  }

  if (onMenuClick) {
    setIsLoading(true);
    try {
      await onMenuClick(item, e);
    } finally {
      setIsLoading(false);
    }
  }

  if (onClose && ! item.keepOpen) {
    onClose();
  }
};

  const handleKeyDown = (e) => {
    if (e. key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleMenuClick(e);
    }
  };

  const itemClasses = [
    styles. item,
    isActive ?  styles.active : "",
    hasSubmenus ? styles.hasSubmenu : "",
    submenuOpen ? styles.submenuOpen : "",
    isLoading ? styles.loading : "",
    isFocused ? styles.focused : "",
    item.variant ?  styles[`variant-${item.variant}`] : "",
  ].filter(Boolean).join(" ");

  return (
    <li className={itemClasses} role="menuitem">
      {item.link && ! hasSubmenus ?  (
        <a
          ref={menuItemRef}
          href={item.link}
          className={styles.link}
          onClick={handleMenuClick}
          onKeyDown={handleKeyDown}
          aria-expanded={hasSubmenus ?  submenuOpen : undefined}
          aria-haspopup={hasSubmenus}
          tabIndex={isFocused ? 0 : -1}
        >
          {item.icon && (
            <span className={styles. icon}>
              {getIcon(item.icon)}
            </span>
          )}
          <span className={styles.label}>{item.label}</span>
          {item.badge && (
            <span className={`${styles.badge} ${styles[`badge-${item.badge. type || 'default'}`]}`}>
              {item.badge.text}
            </span>
          )}
          {isLoading && (
            <span className={styles.spinner}>
              <LucideIcons.Loader2 size={16} />
            </span>
          )}
        </a>
      ) : (
        <button
          ref={menuItemRef}
          className={styles.link}
          onClick={handleMenuClick}
          onKeyDown={handleKeyDown}
          role="button"
          tabIndex={isFocused ? 0 : -1}
          aria-expanded={hasSubmenus ? submenuOpen : undefined}
          aria-haspopup={hasSubmenus}
          disabled={isLoading}
        >
          {item.icon && (
            <span className={styles. icon}>
              {getIcon(item.icon)}
            </span>
          )}
          <span className={styles.label}>{item.label}</span>
          {item.badge && (
            <span className={`${styles.badge} ${styles[`badge-${item.badge.type || 'default'}`]}`}>
              {item.badge.text}
            </span>
          )}
          {isLoading && (
            <span className={styles.spinner}>
              <LucideIcons.Loader2 size={16} />
            </span>
          )}
        </button>
      )}
      
      {hasSubmenus && (
        <ul className={styles.submenu} role="menu">
          {item.submenus.map((sub, idx) => (
            <MenuItem 
              key={`${sub.label}-${idx}`}
              item={sub} 
              onClose={onClose}
              onMenuClick={onMenuClick}
              trackClick={trackClick}
              level={level + 1}
              openSubmenus={openSubmenus}
              onSubmenuToggle={onSubmenuToggle} 
              parentPath={itemPath}
            />
          ))}
        </ul>
      )}
    </li>
  );
};

Header.displayName = "Header";
export default Header;