import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <p>© 2026 promo-app. Всі права захищені.</p>

      <div className="footer-contacts">
        <h4>Контакти:</h4>
        <a href="mailto:vsevolod.a.parashchyn@ukd.edu.ua">
          vsevolod.a.parashchyn@ukd.edu.ua
        </a>
        <a href="mailto:vasyl.v.mokhnatchuk@ukd.edu.ua">
          vasyl.v.mokhnatchuk@ukd.edu.ua
        </a>
      </div>

      <address>
        <a
          href="https://maps.app.goo.gl/SqMAR4Z4jTxti8g58"
          target="_blank"
          rel="noopener noreferrer"
        >
          Івано-Франківськ, Україна (Карта)
        </a>
      </address>
    </footer>
  );
};

export default Footer;
