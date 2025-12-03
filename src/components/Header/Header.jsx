import React, { useState, useEffect, useRef, useCallback } from "react";
import * as LucideIcons from "lucide-react";
import styles from "./Header.module.css";

function getIcon(name, size = 20) {
  const Icon = LucideIcons[name];
  return Icon ? <Icon size={size} /> : null;
}

const SearchBox = ({ onSearch, placeholder = "Search...", className = "" }) => {
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
            className={styles.searchClear}
            aria-label="Clear search"
          >
            <LucideIcons.X size={16} />
          </button>
        )}
      </div>
    </div>
  );
};

const Header = ({
  // UI Configuration
  logo = null,
  menuItems = [],
  searchPlaceholder = "Search menu...",
  enableSearch = false,
  enableKeyboardNav = true,
  enableAnalytics = false,
  theme = "auto",
  className = "",
  
  // State Management - Enhanced
  autoDetectActive = true,         // ✅ Auto-detect active item from URL
  urlToLabelMapping = null,        // ✅ Custom URL to label mapping
  initialActiveItem = null,        // ✅ Manual initial active item
  
  // Callbacks - External
  onMenuClick = null,
  onSearch = null,
  onActiveChange = null,
  onError = null,
  
  ...props
}) => {
  const [activeItem, setActiveItem] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const [openSubmenus, setOpenSubmenus] = useState([]);
  
  const headerRef = useRef(null);
  const menuRef = useRef(null);

  // ✅ Smart Active Detection
  useEffect(() => {
    // اگه کاربر initialActiveItem داده و autoDetect خاموش باشه
    if (initialActiveItem && ! autoDetectActive) {
      setActiveItem(initialActiveItem);
      return;
    }

    if (! autoDetectActive || typeof window === 'undefined') return;

    const detectActiveItem = () => {
      const currentPath = window.location. pathname;
      
      // ✅ اول از custom mapping استفاده کن
      if (urlToLabelMapping && urlToLabelMapping[currentPath]) {
        const mappedLabel = urlToLabelMapping[currentPath];
        setActiveItem(mappedLabel);
        if (onActiveChange) {
          onActiveChange(mappedLabel);
        }
        return;
      }
      
      // ✅ بعد از menuItems خودکار تشخیص بده
      for (const item of menuItems) {
        if (item.link === currentPath) {
          setActiveItem(item. label);
          if (onActiveChange) {
            onActiveChange(item.label);
          }
          return;
        }
        
        // Check submenus
        if (item. submenus) {
          for (const sub of item.submenus) {
            if (sub.link === currentPath) {
              setActiveItem(sub.label);
              if (onActiveChange) {
                onActiveChange(sub.label);
              }
              return;
            }
          }
        }
      }
      
      // ✅ اگه پیدا نکرد، اولین item رو active کن
      if (menuItems.length > 0 && !activeItem) {
        setActiveItem(menuItems[0].label);
        if (onActiveChange) {
          onActiveChange(menuItems[0].label);
        }
      }
    };

    // Detect on mount
    detectActiveItem();

    // Listen for URL changes
    const handleUrlChange = () => {
      setTimeout(detectActiveItem, 0);
    };

    window.addEventListener('popstate', handleUrlChange);
    
    // Listen for programmatic navigation (SPA)
    const originalPushState = window.history.pushState;
    const originalReplaceState = window.history.replaceState;
    
    window. history.pushState = function(...args) {
      originalPushState.apply(window.history, args);
      handleUrlChange();
    };
    
    window.history.replaceState = function(...args) {
      originalReplaceState.apply(window. history, args);
      handleUrlChange();
    };

    return () => {
      window.removeEventListener('popstate', handleUrlChange);
      window.history. pushState = originalPushState;
      window.history.replaceState = originalReplaceState;
    };
  }, [menuItems, autoDetectActive, urlToLabelMapping, initialActiveItem, onActiveChange, activeItem]);

  // ✅ Manual initialActiveItem update
  useEffect(() => {
    if (initialActiveItem && !autoDetectActive) {
      setActiveItem(initialActiveItem);
    }
  }, [initialActiveItem, autoDetectActive]);

  const processMenuItems = (items) => {
    if (!activeItem) return items;
    
    return items.map(item => {
      const isItemActive = activeItem === item.label;
      const hasActiveSubmenu = item.submenus?. some(sub => activeItem === sub.label);
      
      return {
        ...item,
        active: isItemActive || hasActiveSubmenu,
        submenus: item.submenus?. map(sub => ({
          ...sub,
          active: activeItem === sub.label
        }))
      };
    });
  };

  const processedMenuItems = processMenuItems(menuItems);
  
  const filteredMenuItems = searchTerm
    ? processedMenuItems.filter((item) =>
        item.label.toLowerCase(). includes(searchTerm.toLowerCase()) ||
        (item.submenus?. some(sub => 
          sub.label.toLowerCase(). includes(searchTerm.toLowerCase())
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
      e. preventDefault();
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

  const handleSubmenuToggle = (menuLabel) => {
    setOpenSubmenus(prev => {
      if (prev.includes(menuLabel)) {
        return prev.filter(label => label !== menuLabel);
      } else {
        return [menuLabel];
      }
    });
  };

  // ✅ Advanced Submenu Item Click Handler
  const handleSubmenuItemClick = async (parentLabel, subItem, event) => {
    let shouldPreventDefault = false;
    
    try {
      // Close submenu
      setOpenSubmenus(prev => prev.filter(label => label !== parentLabel));
      
      // ✅ Update active item only if not auto-detecting
      if (!autoDetectActive) {
        setActiveItem(subItem. label);
      }
      
      // Create comprehensive menu data
      const menuInfo = {
        ...subItem,
        timestamp: new Date().toISOString(),
        level: 2,
        parentLabel,
        currentUrl: typeof window !== 'undefined' ? window.location.href : '',
        userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : ''
      };
      
      // Call external callback
      if (onMenuClick) {
        const result = await onMenuClick(event, menuInfo);
        
        // Check return value for control
        if (typeof result === 'boolean' && result === false) {
          shouldPreventDefault = true;
        }
        
        if (typeof result === 'object' && result !== null) {
          if (result.preventDefault === true) {
            shouldPreventDefault = true;
          }
        }
      }
      
      // ✅ Manual mode callback
      if (! autoDetectActive && onActiveChange) {
        onActiveChange(subItem.label);
      }
      
    } catch (error) {
      console.error('Header submenu click error:', error);
      
      if (onError) {
        onError(error, subItem);
      }
    }
    
    // Apply control
    if (shouldPreventDefault) {
      event.preventDefault();
    }
    
    // Close mobile menu if needed
    if (! subItem.keepOpen) {
      setTimeout(() => setMobileOpen(false), 150);
    }
    
    return shouldPreventDefault;
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

  // ✅ Advanced Internal Menu Click Handler
  const handleInternalMenuClick = async (item, event) => {
    let shouldPreventDefault = false;
    let shouldStopPropagation = false;
    
    try {
      // ✅ Update active item only if not auto-detecting
      if (!autoDetectActive) {
        setActiveItem(item.label);
      }
      
      // Create comprehensive menu data
      const menuInfo = {
        ...item,
        timestamp: new Date().toISOString(),
        level: 1,
        currentUrl: typeof window !== 'undefined' ? window.location.href : '',
        userAgent: typeof window !== 'undefined' ? window. navigator.userAgent : ''
      };
      
      // Call external callback
      if (onMenuClick) {
        const result = await onMenuClick(event, menuInfo);
        
        // Check return value for control
        if (typeof result === 'boolean' && result === false) {
          shouldPreventDefault = true;
        }
        
        if (typeof result === 'object' && result !== null) {
          if (result.preventDefault === true) {
            shouldPreventDefault = true;
          }
          if (result.stopPropagation === true) {
            shouldStopPropagation = true;
          }
        }
      }
      
      // ✅ Manual mode callback
      if (!autoDetectActive && onActiveChange) {
        onActiveChange(item.label);
      }
      
    } catch (error) {
      console.error('Header menu click error:', error);
      
      if (onError) {
        onError(error, item);
      }
    }
    
    // Apply control actions
    if (shouldPreventDefault) {
      event.preventDefault();
    }
    
    if (shouldStopPropagation) {
      event. stopPropagation();
    }
    
    return { shouldPreventDefault, shouldStopPropagation };
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      const burgerButton = headerRef.current?. querySelector('.burger');
      
      if (burgerButton?. contains(event.target)) {
        return;
      }
      
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMobileOpen(false);
        setOpenSubmenus([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document. removeEventListener("mousedown", handleClickOutside);
      document. removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  const headerClasses = [
    styles.header,
    className
  ].filter(Boolean).join(" ");

  return (
    <header 
      ref={headerRef}
      className={headerClasses} 
      data-theme={theme}
      {...props}
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
          ref={menuRef}
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
                onMenuClick={handleInternalMenuClick}
                onSubmenuItemClick={handleSubmenuItemClick}
                trackClick={trackMenuClick}
                isFocused={focusedIndex === idx}
                openSubmenus={openSubmenus}
                onSubmenuToggle={handleSubmenuToggle}
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

const MenuItem = ({ 
  item, 
  onClose, 
  onMenuClick,
  onSubmenuItemClick,
  trackClick,
  isFocused = false,
  openSubmenus = [],
  onSubmenuToggle
}) => {
  const hasSubmenus = Array.isArray(item.submenus) && item.submenus.length > 0;
  const isActive = !!item.active;
  const submenuOpen = openSubmenus.includes(item.label);
  const [isLoading, setIsLoading] = useState(false);
  const menuItemRef = useRef(null);

  useEffect(() => {
    if (isFocused && menuItemRef. current) {
      menuItemRef.current.focus();
    }
  }, [isFocused]);

  const handleMenuClick = async (e) => {
    trackClick?.(item);
    
    if (hasSubmenus) {
      e.preventDefault();
      onSubmenuToggle?.(item.label);
      return;
    }

    if (openSubmenus.length > 0) {
      onSubmenuToggle?. ('CLOSE_ALL');
    }

    if (onMenuClick) {
      setIsLoading(true);
      try {
        const result = await onMenuClick(item, e);
        
        // Check if navigation should be prevented
        if (result && (result.shouldPreventDefault || result === false)) {
          // Navigation was handled by callback
        }
      } finally {
        setIsLoading(false);
      }
    }

    if (onClose && !item.keepOpen) {
      onClose();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
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
            <span className={styles.icon}>
              {getIcon(item.icon)}
            </span>
          )}
          <span className={styles.label}>{item.label}</span>
          {item.badge && (
            <span className={`${styles. badge} ${styles[`badge-${item.badge.type || 'default'}`]}`}>
              {item.badge.text}
            </span>
          )}
          {isLoading && (
            <span className={styles. spinner}>
              <LucideIcons.Loader2 size={16} />
            </span>
          )}
        </button>
      )}
      
      {hasSubmenus && (
        <ul className={styles.submenu} role="menu">
          {item.submenus.map((sub, idx) => (
            <li key={`${sub.label}-${idx}`} className={styles. item}>
              {sub.link ?  (
                <a
                  href={sub.link}
                  className={styles.link}
                  onClick={async (e) => {
                    trackClick?.(sub, 2);
                    await onSubmenuItemClick?.(item.label, sub, e);
                  }}
                >
                  {sub.icon && (
                    <span className={styles.icon}>
                      {getIcon(sub.icon)}
                    </span>
                  )}
                  <span className={styles.label}>{sub. label}</span>
                  {sub.badge && (
                    <span className={`${styles.badge} ${styles[`badge-${sub.badge.type || 'default'}`]}`}>
                      {sub.badge. text}
                    </span>
                  )}
                </a>
              ) : (
                <button
                  className={styles.link}
                  onClick={async (e) => {
                    trackClick?.(sub, 2);
                    await onSubmenuItemClick?.(item.label, sub, e);
                  }}
                >
                  {sub.icon && (
                    <span className={styles.icon}>
                      {getIcon(sub.icon)}
                    </span>
                  )}
                  <span className={styles.label}>{sub.label}</span>
                  {sub.badge && (
                    <span className={`${styles.badge} ${styles[`badge-${sub.badge.type || 'default'}`]}`}>
                      {sub.badge.text}
                    </span>
                  )}
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};

Header.displayName = "Header";
export default Header;