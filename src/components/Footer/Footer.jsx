

export const Footer = () => (
  <footer>
    <div className={styles['ku-footer-container']}>
      <span className={styles['ku-footer-copyright']}>
        &copy; {new Date().getFullYear()} KlarUI. Alle Rechte vorbehalten.
      </span>
      <span className={styles['ku-footer-links']}>
        <a href="https://klarui.de/impressum" target="_blank" rel="noopener noreferrer">Impressum</a>
        <span> | </span>
        <a href="https://klarui.de/datenschutz" target="_blank" rel="noopener noreferrer">Datenschutz</a>
      </span>
    </div>
  </footer>
);


Footer.displayName = 'Footer';
export default Footer;
