import React, { useState, useEffect, useRef } from "react";
import * as LucideIcons from "lucide-react";
import styles from "./Footer.module.css";
import { enhanceClasses } from "../../utils/enhanceClasses";

function getIcon(name, size = 20) {
  const Icon = LucideIcons[name];
  return Icon ? <Icon size={size} /> : null;
}

const ScrollToTop = ({ 
  show = true, 
  position = "floating", 
  alignment = "right",
  className = "" 
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!  show) return;

    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, [show]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  if (!show || !isVisible) return null;

  const buttonClasses = [
    styles.scrollToTop,
    styles[`scroll-${position}`],
    styles[`scroll-${alignment}`],
    className
  ].filter(Boolean).join(" ");

  return (
    <button
      onClick={scrollToTop}
      className={buttonClasses}
      aria-label="Scroll to top"
    >
      <LucideIcons.ChevronUp size={24} />
    </button>
  );
};

const FooterColumn = ({ title, children, className = "" }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={`${styles.column} ${className}`}>
      <button
        className={styles.columnHeader}
        onClick={() => setIsExpanded(!isExpanded)}
        aria-expanded={isExpanded}
      >
        <h3 className={styles.columnTitle}>{title}</h3>
        <LucideIcons.ChevronDown 
          size={16} 
          className={`${styles.chevron} ${isExpanded ? styles.expanded : ""}`}
        />
      </button>
      
      <div className={`${styles.columnContent} ${isExpanded ? styles.show : ""}`}>
        {children}
      </div>
    </div>
  );
};

const FooterLink = ({ 
  href, 
  children, 
  icon, 
  external = false, 
  onClick, 
  className = "",
  active = false  // ✅ اضافه شده
}) => {
  const handleClick = async (e) => {
    let shouldPreventDefault = false;
    let shouldStopPropagation = false;
    
    if (onClick) {
      try {
        const result = await onClick(e, {
          href,
          external,
          label: children,
          icon,
          active  // ✅ اضافه شده
        });
        
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
      } catch (error) {
        console.error('Footer link onClick error:', error);
      }
    }
    
    if (shouldPreventDefault) {
      e.preventDefault();
    }
    
    if (shouldStopPropagation) {
      e.stopPropagation();
    }
  };

  const linkProps = {
    className: `${styles.link} ${active ? styles.active : ""} ${className}`,  // ✅ active class
    onClick: handleClick
  };

  if (href) {
    linkProps.href = href;
    if (external) {
      linkProps.target = "_blank";
      linkProps.rel = "noopener noreferrer";
    }
  }

  const LinkComponent = href ? "a" : "button";

  return (
    <LinkComponent {...linkProps}>
      {icon && (
        <span className={styles.linkIcon}>
          {getIcon(icon, 16)}
        </span>
      )}
      <span>{children}</span>
      {external && (
        <LucideIcons.ExternalLink size={12} className={styles.externalIcon} />
      )}
    </LinkComponent>
  );
};

const Footer = ({
  // UI Configuration
  columns = 1,
  data = [],
  copyright = "",
  logo = null,
  scrollToTop = true,
  scrollPosition = "floating",
  scrollAlignment = "right",
  theme = "auto",
  className = "",
  children,
  
  autoDetectActive = true,         // Auto-detect active item from URL
  urlToLabelMapping = null,        // Custom URL to label mapping
  initialActiveItem = null,        // Manual initial active item
  
  // Callbacks - External
  onLinkClick = null,
  onError = null,
  onActiveChange = null, 
  
  ...props
}) => {
  const [activeItem, setActiveItem] = useState(null); 
  const footerRef = useRef(null);
  const validColumns = Math.min(Math.max(1, columns), 5);
  
  useEffect(() => {
    if (initialActiveItem && !  autoDetectActive) {
      setActiveItem(initialActiveItem);
      return;
    }

    if (!  autoDetectActive || typeof window === 'undefined') return;

    const detectActiveItem = () => {
      const currentPath = window.location.pathname;
      
      if (urlToLabelMapping && urlToLabelMapping[currentPath]) {
        const mappedLabel = urlToLabelMapping[currentPath];
        setActiveItem(mappedLabel);
        if (onActiveChange) {
          onActiveChange(mappedLabel);
        }
        return;
      }
      
      for (const column of data) {
        if (column.links) {
          for (const link of column.links) {
            if (link.href === currentPath) {
              setActiveItem(link.label);
              if (onActiveChange) {
                onActiveChange(link.label);
              }
              return;
            }
          }
        }
      }
    };

    detectActiveItem();

    const handleUrlChange = () => {
      setTimeout(detectActiveItem, 0);
    };

    window.addEventListener('popstate', handleUrlChange);
    
    const originalPushState = window.history.pushState;
    const originalReplaceState = window.history.replaceState;
    
    window.history.pushState = function(...args) {
      originalPushState.apply(window.history, args);
      handleUrlChange();
    };
    
    window.history.replaceState = function(...args) {
      originalReplaceState.apply(window.history, args);
      handleUrlChange();
    };

    return () => {
      window.removeEventListener('popstate', handleUrlChange);
      window.history.pushState = originalPushState;
      window.history.replaceState = originalReplaceState;
    };
  }, [data, autoDetectActive, urlToLabelMapping, initialActiveItem, onActiveChange]);

  // ✅ Manual initialActiveItem update
  useEffect(() => {
    if (initialActiveItem && ! autoDetectActive) {
      setActiveItem(initialActiveItem);
    }
  }, [initialActiveItem, autoDetectActive]);

  // ✅ Process data با active states
  const processedData = data.map(column => ({
    ...column,
    links: column.links?.map(link => ({
      ...link,
      active: activeItem === link.label
    }))
  }));

  const enhanceChildren = (children) => {
    return React.Children.map(children, (child) => {
      if (React.isValidElement(child)) {
        const childClassName = child.props.className || '';
        const enhancedClassName = enhanceClasses(childClassName, styles);
        
        return React.cloneElement(child, {
          ...child.props,
          className: enhancedClassName.trim()
        });
      }
      return child;
    });
  };

  // ✅ Advanced Link Handler (بهبود یافته)
  const handleInternalLinkClick = async (event, linkData) => {
    let shouldPreventDefault = false;
    
    try {
      // Update active item only if not auto-detecting
      if (!autoDetectActive) {
        setActiveItem(linkData.label);
      }
      
      // Create comprehensive link data
      const linkInfo = {
        ...linkData,
        timestamp: new Date().toISOString(),
        userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : '',
        currentUrl: typeof window !== 'undefined' ? window.location.href : '',
        level: 'footer' 
      };
      
      // Call external callback with full context
      if (onLinkClick) {
        const result = await onLinkClick(event, linkInfo);
        
        // Check return value for control
        if (typeof result === 'boolean' && result === false) {
          shouldPreventDefault = true;
        }
        
        if (typeof result === 'object' && result !== null) {
          if (result.preventDefault === true) {
            shouldPreventDefault = true;
          }
        }
        
        return result;
      }
      
      // Manual mode callback
      if (!  autoDetectActive && onActiveChange) {
        onActiveChange(linkData.label);
      }
      
    } catch (error) {
      console.error('Footer link click error:', error);
      
      if (onError) {
        onError(error, linkData);
      }
    }
    
    if (shouldPreventDefault) {
      event.preventDefault();
    }
  };

  const footerClasses = [
    styles.footer,
    styles[`columns-${validColumns}`],
    className
  ].filter(Boolean).join(" ");

  return (
    <>
      <footer 
        ref={footerRef}
        className={footerClasses}
        data-theme={theme}
        {...props}
      >
        <div className={styles.container}>
          {logo && (
            <div className={styles.logoSection}>
              {logo}
            </div>
          )}

          {processedData.length > 0 && (
            <div className={styles.grid}>
              {processedData.slice(0, validColumns).map((column, index) => (
                <FooterColumn
                  key={`${column.title}-${index}`}
                  title={column.title}
                  className={column.className}
                >
                  <div className={styles.linkList}>
                    {column.links?.map((link, linkIndex) => (
                      <FooterLink
                        key={`${link.label}-${linkIndex}`}
                        href={link.href}
                        icon={link.icon}
                        external={link.external}
                        active={link.active} 
                        onClick={(event, linkData) => handleInternalLinkClick(event, { ...linkData, ...link })}
                        className={link.className}
                      >
                        {link.label}
                      </FooterLink>
                    ))}
                  </div>
                </FooterColumn>
              ))}
            </div>
          )}

          {children && (
            <div className={styles.childrenWrapper}>
              {enhanceChildren(children)}
            </div>
          )}

          {copyright && (
            <div className={styles.copyright}>
              <p>{copyright}</p>
            </div>
          )}

          {scrollToTop && scrollPosition === "footer" && (
            <div className={styles.footerScrollContainer}>
              <ScrollToTop
                show={true}
                position="footer"
                alignment={scrollAlignment}
              />
            </div>
          )}
        </div>
      </footer>

      {scrollToTop && scrollPosition === "floating" && (
        <ScrollToTop
          show={true}
          position="floating"
          alignment={scrollAlignment}
        />
      )}
    </>
  );
};

Footer.displayName = "Footer";
export default Footer;