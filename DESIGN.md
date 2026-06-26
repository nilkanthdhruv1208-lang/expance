---
name: ExpenseFlow
colors:
  surface: '#f7f9fb'
  surface-dim: '#d8dadc'
  surface-bright: '#f7f9fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f4f6'
  surface-container: '#eceef0'
  surface-container-high: '#e6e8ea'
  surface-container-highest: '#e0e3e5'
  on-surface: '#191c1e'
  on-surface-variant: '#3e4947'
  inverse-surface: '#2d3133'
  inverse-on-surface: '#eff1f3'
  outline: '#6e7977'
  outline-variant: '#bdc9c6'
  surface-tint: '#006a63'
  primary: '#005c55'
  on-primary: '#ffffff'
  primary-container: '#0f766e'
  on-primary-container: '#a3faef'
  inverse-primary: '#80d5cb'
  secondary: '#006e2f'
  on-secondary: '#ffffff'
  secondary-container: '#6bff8f'
  on-secondary-container: '#007432'
  tertiary: '#a60419'
  on-tertiary: '#ffffff'
  tertiary-container: '#ca282d'
  on-tertiary-container: '#ffe5e2'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#9cf2e8'
  primary-fixed-dim: '#80d5cb'
  on-primary-fixed: '#00201d'
  on-primary-fixed-variant: '#00504a'
  secondary-fixed: '#6bff8f'
  secondary-fixed-dim: '#4ae176'
  on-secondary-fixed: '#002109'
  on-secondary-fixed-variant: '#005321'
  tertiary-fixed: '#ffdad7'
  tertiary-fixed-dim: '#ffb3ad'
  on-tertiary-fixed: '#410004'
  on-tertiary-fixed-variant: '#930013'
  background: '#f7f9fb'
  on-background: '#191c1e'
  surface-variant: '#e0e3e5'
typography:
  display-currency:
    fontFamily: Inter
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  title-md:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-caps:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 4px
  xs: 8px
  sm: 12px
  md: 16px
  lg: 24px
  xl: 32px
  gutter: 16px
  margin-mobile: 16px
  margin-desktop: 48px
  max-width: 1200px
---

## Brand & Style
The brand personality is professional, calm, and highly efficient. The design system prioritizes clarity and financial confidence, utilizing a **Corporate Modern** style with a focus on **Minimalism**. The user experience should feel effortless and precise, removing cognitive load through generous whitespace and a clear visual hierarchy. It balances the trustworthiness of a traditional financial institution with the agility of a modern technology startup.

## Colors
The palette is centered around **Deep Teal**, signaling stability and sophistication. **Success Green** and **Alert Red** are reserved strictly for semantic financial indicators (income vs. expense). 

In **Light Mode**, the background uses a soft slate-gray (#F8FAFC) to reduce glare and allow white cards to pop. 
In **Dark Mode**, the interface shifts to deep navy tones (#0F172A), ensuring high legibility of financial data while maintaining the premium feel of the brand. Secondary and tertiary colors are slightly desaturated in Dark Mode to maintain accessibility standards.

## Typography
This design system utilizes **Inter** for its exceptional legibility and systematic feel. 

Financial amounts are treated as "Display" elements; they use a bold weight and tighter letter-spacing to command attention. Primary navigation and section headers use a semi-bold weight to create a clear structure. Body text is kept clean with ample line height to ensure transaction lists remain scannable. Small labels use uppercase styling with increased tracking to differentiate them from interactive text.

## Layout & Spacing
The layout follows a **fluid grid** model for mobile and a **fixed, centered grid** for desktop. 

We use an 8px base unit (with a 4px step for micro-adjustments). On mobile devices, side margins are fixed at 16px. On desktop, the content is constrained to a 1200px container with 12 columns. Vertical rhythm is strictly enforced: 24px between cards, and 32px between major sections. Generous internal padding (24px) within cards ensures financial data doesn't feel cramped.

## Elevation & Depth
Hierarchy is established through **Ambient Shadows** and **Tonal Layers**. 

The background is the lowest level. Surface cards sit on the first elevation layer with a very soft, diffused shadow: `0px 4px 20px rgba(15, 23, 42, 0.05)`. Floating Action Buttons (FABs) and modals occupy the highest elevation, using a more pronounced shadow to indicate interactivity and z-index priority. In Dark Mode, elevation is communicated by lightening the surface color of the card rather than increasing shadow opacity.

## Shapes
The shape language is consistently **Rounded**. 

Standard containers, cards, and input fields utilize a 16px (`rounded-lg`) corner radius to evoke a modern, friendly feel. Smaller elements like chips or badges may use a fully rounded "pill" shape. The consistent use of 16px radius across all primary UI components creates a cohesive, "card-based" ecosystem that feels tactile and approachable.

## Components
- **Stat Cards:** Pure white background (or #1E293B in dark mode), 24px internal padding, featuring a large currency display and a small trend indicator (Success Green or Alert Red).
- **Transaction List Items:** 72px height, horizontal layout with a circular category icon (soft teal background), title and timestamp stacked on the left, and the amount right-aligned.
- **Segmented Controls:** A capsule-shaped container with a subtle background fill; the active state is a white (or slate-800) card with a subtle shadow that "slides" between options.
- **Bottom Tab Bar:** Blurring background (backdrop-filter: blur) with 12px vertical padding. Active icons use the Primary Deep Teal color.
- **Floating Action Button (FAB):** Circular, 56px diameter, centered or right-aligned. Uses the Primary Deep Teal with a white '+' icon.
- **Input Fields:** 16px rounded corners, 1px border (#E2E8F0), focusing to a 2px Deep Teal border with a soft teal outer glow.
- **Category Icons:** Minimalist line icons contained within a 40px circular container with 10% opacity of the icon color.