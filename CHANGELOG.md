# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.4] - 2025-11-05

### Added
- Hover versions for all 50+ animations (hover-fadeInUp, hover-bounce, hover-pulse, hover-shake, hover-zoom, etc.)
- Complete parity between entry animations and hover animations

## [0.1.3] - 2025-11-05

### Added
- Hover effect utilities using CSS transitions (hover-lift, hover-scale, hover-glow, hover-rotate, hover-brighten, hover-shadow, hover-slide-*, hover-grow, hover-shrink)
- Documentation for combining entry animations, hover effects, and click animations
- Interactive click animation examples

### Changed
- Improved hover effects to use transitions instead of animations (prevents replay on mouse leave)

## [0.1.2] - 2025-11-05

### Fixed
- Fixed animations.css export path in package.json

## [0.1.1] - 2025-11-05

### Added
- 50+ CSS animations library (`animations.css`)
- `rounded` prop for Button: 'none' | 'small' | 'medium' | 'large' | 'full' (pill shape)
- `style` prop for custom inline styles
- Support for custom CSS classes via `className`
- Comprehensive customization documentation

### Changed
- Enhanced Button component with more flexibility
- Updated documentation with animation examples

## [0.1.0] - 2025-11-05

### Added
- Initial release
- Button component with variants (primary, secondary, success, warning, error)
- Outline style support
- Size variants (small, medium, large)
- Full width option
- Disabled state
- TypeScript support

### Features
- 🇩🇪 DSGVO-compliant by design
- ♿ WCAG 2.1 AA accessibility
- 🌳 Tree-shaking for optimal bundle size
- 🎨 CSS Modules for style isolation
