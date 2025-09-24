# Sagittarius Design System & Style Guide

## Brand Identity
- **Company Name**: Sagittarius
- **Tagline**: AI Websites for Science
- **Focus Areas**: Biology, Chemistry, Physics

## Color Palette

### Primary Colors
```css
/* Primary background (dark navy/charcoal) */
--bg-color: #050A12;
/* RGB: 5, 10, 18 */
/* Usage: Main background color */
/* Tailwind: bg-sage-bg */

/* Accent/highlight (bright cyan) */
--accent-color: #53D5FF;
/* RGB: 83, 213, 255 */
/* Usage: Primary accent, buttons, highlights */
/* Tailwind: text-sage-accent, bg-sage-accent */

/* Body/paragraph text (muted light gray) */
--text-color: #B8BBC4;
/* RGB: 184, 187, 196 */
/* Usage: Body text and descriptions */
/* Tailwind: text-sage-text */

/* Light text (headings and important text) */
--text-light: #E2E5EA;
/* RGB: 226, 229, 234 */
/* Usage: Headings and important text */
/* Tailwind: text-sage-text-light */
```

### Secondary Colors
```css
/* Card backgrounds */
--card-bg: #0A1220;
/* RGB: 10, 18, 32 */
/* Usage: Card and container backgrounds */
/* Tailwind: bg-sage-card */

/* Borders and dividers */
--border-color: #1A2332;
/* RGB: 26, 35, 50 */
/* Usage: Borders and dividers */
/* Tailwind: border-sage-border */

/* Deep shadows */
--deep-bg: #000010;
/* RGB: 0, 0, 16 */
/* Usage: Deep shadows and dark gradients */
/* Tailwind: bg-sage-deep */
```

## Typography

### Font Family
```css
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', sans-serif;
```

### Font Weights
- **Light**: 300
- **Regular**: 400
- **Medium**: 500
- **Semibold**: 600
- **Bold**: 700
- **Extra Bold**: 800

### Font Sizes
- **Hero**: 4rem (64px)
- **H1**: 3rem (48px)
- **H2**: 2.25rem (36px)
- **H3**: 1.875rem (30px)
- **H4**: 1.5rem (24px)
- **Body**: 1rem (16px)
- **Small**: 0.875rem (14px)

### Line Heights
- **Headings**: 1.2
- **Body**: 1.6
- **Loose**: 1.8

## Spacing System

### 8px Base Scale
- **XS**: 0.5rem (8px)
- **SM**: 0.75rem (12px)
- **MD**: 1rem (16px)
- **LG**: 1.5rem (24px)
- **XL**: 2rem (32px)
- **2XL**: 3rem (48px)
- **3XL**: 4rem (64px)
- **4XL**: 6rem (96px)

### Section Spacing
- **Padding**: 4rem 0 (64px top/bottom)
- **Margin Bottom**: 3rem (48px)

## Components

### Buttons
```css
/* Primary Button */
.btn-primary {
  background-color: var(--accent-color);
  color: var(--bg-color);
  font-weight: 600;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
}

/* Secondary Button */
.btn-secondary {
  border: 1px solid var(--accent-color);
  color: var(--accent-color);
  font-weight: 600;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
}
```

### Cards
```css
.card {
  background-color: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 0.75rem;
  padding: 1.5rem;
}
```

## Breakpoints
- **Mobile**: 640px
- **Tablet**: 768px
- **Laptop**: 1024px
- **Desktop**: 1280px
- **XL**: 1536px

## Animations

### Keyframes
```css
/* Float Animation */
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
}

/* Glow Animation */
@keyframes glow {
  0% { box-shadow: 0 0 5px #53D5FF, 0 0 10px #53D5FF; }
  100% { box-shadow: 0 0 10px #53D5FF, 0 0 20px #53D5FF, 0 0 30px #53D5FF; }
}

/* Slide Up Animation */
@keyframes slideUp {
  0% { opacity: 0; transform: translateY(30px); }
  100% { opacity: 1; transform: translateY(0); }
}
```

### Animation Classes
- **Float**: `animate-float` (6s ease-in-out infinite)
- **Glow**: `animate-glow` (2s ease-in-out infinite alternate)
- **Slide Up**: `animate-slide-up` (0.5s ease-out)

## Usage Guidelines

### Brand Colors
- Use `#050A12` as the primary background for all pages
- Use `#53D5FF` for all interactive elements and highlights
- Ensure text contrast meets WCAG AA standards
- Use gradient effects sparingly for accent elements

### Typography
- Use Inter font family consistently
- Maintain proper hierarchy with font sizes and weights
- Line height should be 1.6 for body text, 1.2 for headings
- Never use more than 3 font weights per page

### Components
- All cards should use the `.card` class for consistency
- Buttons should follow the defined primary/secondary patterns
- Maintain 8px spacing multiples throughout
- Use hover states and micro-interactions for better UX

### Editable Content Areas
- All placeholder text marked with `[REPLACE WITH COMPANY_TEXT]`
- FAQ and footer content manageable through admin panel
- Style tokens defined in `tailwind.config.js`
- CSS custom properties available in `:root`

## File Structure
- **Colors**: `tailwind.config.js` and `src/styles/globals.css`
- **Components**: `src/components/`
- **Style Guide Data**: `src/data/styleGuide.json`
- **Admin Panel**: `src/pages/Admin.tsx` for content management

This style guide ensures visual consistency and provides clear guidelines for maintaining and extending the Sagittarius brand identity.