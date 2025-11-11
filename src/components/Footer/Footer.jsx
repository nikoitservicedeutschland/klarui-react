
export const Footer = () => (
  <footer>
    <div className="ku-footer-container">
      <span className="ku-footer-copyright">
        &copy; {new Date().getFullYear()} KlarUI. Alle Rechte vorbehalten.
      </span>
      <span className="ku-footer-links">
        <a href="https://klarui.de/impressum" target="_blank" rel="noopener noreferrer">Impressum</a>
        <span> | </span>
        <a href="https://klarui.de/datenschutz" target="_blank" rel="noopener noreferrer">Datenschutz</a>
      </span>
    </div>
  </footer>
);


Footer.displayName = 'Footer';
export default Footer;
