# @klarui/react

Eine moderne, DSGVO-konforme React-Komponenten-Bibliothek für den deutschen Markt.

[![npm version](https://img.shields.io/npm/v/@klarui/react.svg)](https://www.npmjs.com/package/@klarui/react)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

## ✨ Features

- 🇩🇪 **DSGVO-konform** - Entwickelt für den deutschen Markt mit Fokus auf Datenschutz
- ♿ **Barrierefrei** - WCAG 2.1 AA konform
- 🌳 **Tree-shaking** - Nur verwendete Komponenten werden gebündelt
- 🎨 **CSS Modules** - Scoped Styling ohne Konflikte
- 📦 **TypeScript-ready** - Mit TypeScript-Definitionen (geplant)
- ⚡ **Leichtgewichtig** - Optimiert für Performance

## 📦 Installation

```bash
npm install @klarui/react
```

Oder mit pnpm:

```bash
pnpm add @klarui/react
```

## 🚀 Schnellstart

```jsx
import { Button } from '@klarui/react';
import '@klarui/react/styles.css';

function App() {
  return (
    <div>
      <Button variant="primary">Klick mich</Button>
      <Button variant="success" size="large">Erfolgreich</Button>
      <Button variant="error" outline>Fehler</Button>
    </div>
  );
}
```

## 📚 Verfügbare Komponenten

### Button
Vielseitige Button-Komponente mit mehreren Varianten und Größen.

**Props:**
- `variant`: `'primary' | 'secondary' | 'success' | 'warning' | 'error'` (default: `'primary'`)
- `size`: `'small' | 'medium' | 'large'` (default: `'medium'`)
- `outline`: `boolean` - Outline-Stil verwenden
- `fullWidth`: `boolean` - Button auf volle Breite
- `disabled`: `boolean` - Button deaktivieren
- `onClick`: `Function` - Click-Handler
- `type`: `'button' | 'submit' | 'reset'` (default: `'button'`)

**Beispiel:**
```jsx
<Button variant="primary" size="large" onClick={() => alert('Geklickt!')}>
  Primär Button
</Button>
```

### Weitere Komponenten (geplant)
- Card
- Input
- Modal
- Alert
- Badge

## 📖 Dokumentation

Vollständige Dokumentation und Live-Beispiele: [https://klarui.de](https://klarui.de)

## 🤝 Contribution

Beiträge sind willkommen! Bitte lesen Sie unsere Contribution Guidelines.

## 📄 Lizenz

MIT © KlarUI

## 🔗 Links

- [Dokumentation](https://klarui.de)
- [GitHub Repository](https://github.com/nikoitservicedeutschland/klarui)
- [npm Package](https://www.npmjs.com/package/@klarui/react)
- [Issues](https://github.com/nikoitservicedeutschland/klarui/issues)
