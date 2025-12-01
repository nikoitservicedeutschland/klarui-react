عالی، پس یک نسخه کامل و حرفه‌ای برای **Container** آماده می‌کنیم که شامل همه چیز باشد:

* **Width / MaxWidth** (responsive)
* **Padding** (responsive)
* **Margin** (responsive)
* **Overflow / Scroll**
* **Position / Z-Index**
* **Display / Flex (اختیاری)**
* **ClassName / Style / Animation**
* **Props برای breakpoints (sm, md, lg, xl)**

---

### ساختار فولدر پیشنهادی

```
components/
└── Container/
    ├── Container.jsx
    └── Container.module.css
```

---

### Container.module.css

```css
.container {
  width: 100%;
  box-sizing: border-box;
  margin-left: auto;
  margin-right: auto;
  display: block; /* default */
}

/* Responsive padding & margin using custom properties */
@media (min-width: 640px) {
  .container {
    padding: var(--padding-sm, var(--padding));
    margin: var(--margin-sm, var(--margin));
  }
}

@media (min-width: 768px) {
  .container {
    padding: var(--padding-md, var(--padding-sm, var(--padding)));
    margin: var(--margin-md, var(--margin-sm, var(--margin)));
  }
}

@media (min-width: 1024px) {
  .container {
    padding: var(--padding-lg, var(--padding-md, var(--padding-sm, var(--padding))));
    margin: var(--margin-lg, var(--margin-md, var(--margin-sm, var(--margin))));
  }
}

@media (min-width: 1280px) {
  .container {
    padding: var(--padding-xl, var(--padding-lg, var(--padding-md, var(--padding-sm, var(--padding)))));
    margin: var(--margin-xl, var(--margin-lg, var(--margin-md, var(--margin-sm, var(--margin)))));
  }
}
```

---

### Container.jsx

```jsx
import React from 'react';
import styles from './Container.module.css';

export default function Container({
  children,
  className = '',
  style = {},
  width = '100%',
  maxWidth = '1200px',

  /* Padding responsive */
  padding = '0 16px',
  paddingSm,
  paddingMd,
  paddingLg,
  paddingXl,

  /* Margin responsive */
  margin = '0',
  marginSm,
  marginMd,
  marginLg,
  marginXl,

  /* Overflow */
  overflow,
  overflowX,
  overflowY,

  /* Position */
  position,
  top,
  right,
  bottom,
  left,
  zIndex,

  /* Display (اختیاری) */
  display,

  ...restProps
}) {
  // responsive CSS variables
  const responsiveStyles = {
    width,
    maxWidth,
    '--padding': padding,
    ...(paddingSm && { '--padding-sm': paddingSm }),
    ...(paddingMd && { '--padding-md': paddingMd }),
    ...(paddingLg && { '--padding-lg': paddingLg }),
    ...(paddingXl && { '--padding-xl': paddingXl }),

    '--margin': margin,
    ...(marginSm && { '--margin-sm': marginSm }),
    ...(marginMd && { '--margin-md': marginMd }),
    ...(marginLg && { '--margin-lg': marginLg }),
    ...(marginXl && { '--margin-xl': marginXl }),

    overflow,
    overflowX,
    overflowY,

    position,
    top,
    right,
    bottom,
    left,
    zIndex,

    display,

    ...style,
  };

  return (
    <div
      className={`${styles.container} ${className}`}
      style={responsiveStyles}
      {...restProps}
    >
      {children}
    </div>
  );
}
```

---

### نحوه استفاده (مثال کامل)

```jsx
<Container
  width="100%"
  maxWidth="1400px"
  padding="16px"
  paddingMd="32px"
  paddingLg="48px"
  margin="0 auto"
  marginLg="24px"
  overflow="hidden"
  position="relative"
  zIndex={10}
  display="flex"
  className="custom-animation"
>
  <Section>
    <Flex gapHorizontal="16px" gapVertical="16px">
      <Column>Content A</Column>
      <Column>Content B</Column>
    </Flex>
  </Section>
</Container>
```

---

✅ ویژگی‌ها:

1. **کاملاً ماژولار و responsive** برای همه props
2. **Mobile-first** با breakpoints sm, md, lg, xl
3. پشتیبانی از **padding و margin responsive**
4. قابلیت **overflow, position, zIndex, display**
5. امکان **override با className و style**
6. آماده برای **animation یا transition**
7. Base default values دارد ولی می‌توان برای هر breakpoint سفارشی کرد

