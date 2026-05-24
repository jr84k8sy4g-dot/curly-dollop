# Soft UI Design Tokens — Tailwind Reference (Light + Dark)

Complete token system for Soft UI Dashboard PRO Tailwind with full light/dark theme support.

**Source**: [Soft UI Dashboard PRO Tailwind — Live Demo](https://demos.creative-tim.com/soft-ui-dashboard-pro-tailwind/pages/dashboards/default.html) | [GitHub](https://github.com/creativetimofficial/ct-soft-ui-dashboard-pro-tailwind)

## Required Style Block

**Paste this `<style>` block at the top of every artifact.** It defines all custom utilities for both light and dark themes. Dark mode uses the `class` strategy — add `.dark` to a parent element to activate.

```html
<style>
    @import url("https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&display=swap");

    /* ══════════════════════════════════════════
     BASE
     ══════════════════════════════════════════ */
    * {
        font-family: "Open Sans", sans-serif;
    }

    /* ══════════════════════════════════════════
     THEME COLORS (accent — same in both modes)
     ══════════════════════════════════════════ */
    .text-primary {
        color: #cb0c9f;
    }
    .bg-primary {
        background-color: #cb0c9f;
    }
    .border-primary {
        border-color: #cb0c9f;
    }
    .text-success {
        color: #82d616;
    }
    .text-info {
        color: #17c1e8;
    }
    .text-warning {
        color: #fbcf33;
    }
    .text-danger {
        color: #ea0606;
    }

    /* ══════════════════════════════════════════
     NEUTRAL COLORS — LIGHT THEME
     ══════════════════════════════════════════ */
    .text-dark {
        color: #344767;
    }
    .text-body {
        color: #67748e;
    }
    .text-muted {
        color: #8392ab;
    }
    .text-secondary {
        color: #8392ab;
    }
    .bg-page {
        background-color: #f8f9fa;
    }
    .bg-light {
        background-color: #e9ecef;
    }
    .border-light {
        border-color: #e9ecef;
    }
    .border-input {
        border-color: #d2d6da;
    }

    /* ══════════════════════════════════════════
     NEUTRAL COLORS — DARK THEME OVERRIDES
     ══════════════════════════════════════════ */
    .dark .dark\:bg-dark-page {
        background-color: #1a1f36;
    }
    .dark .dark\:bg-dark-card {
        background-color: #202940;
    }
    .dark .dark\:text-white {
        color: #ffffff;
    }
    .dark .dark\:text-white\/80 {
        color: rgba(255, 255, 255, 0.8);
    }
    .dark .dark\:text-white\/60 {
        color: rgba(255, 255, 255, 0.6);
    }
    .dark .dark\:text-white\/40 {
        color: rgba(255, 255, 255, 0.4);
    }
    .dark .dark\:border-white\/10 {
        border-color: rgba(255, 255, 255, 0.1);
    }
    .dark .dark\:border-white\/20 {
        border-color: rgba(255, 255, 255, 0.2);
    }
    .dark .dark\:border-dark-card {
        border-color: #202940;
    }
    .dark .dark\:bg-white\/5 {
        background-color: rgba(255, 255, 255, 0.05);
    }
    .dark .dark\:bg-white\/10 {
        background-color: rgba(255, 255, 255, 0.1);
    }
    .dark .dark\:bg-white\/20 {
        background-color: rgba(255, 255, 255, 0.2);
    }
    .dark .dark\:placeholder\:text-white\/40::placeholder {
        color: rgba(255, 255, 255, 0.4);
    }

    /* ══════════════════════════════════════════
     GRADIENT BACKGROUNDS (same in both modes)
     Direction: always 310deg
     ══════════════════════════════════════════ */
    .bg-gradient-primary {
        background: linear-gradient(310deg, #7928ca, #ff0080);
    }
    .bg-gradient-info {
        background: linear-gradient(310deg, #2152ff, #21d4fd);
    }
    .bg-gradient-success {
        background: linear-gradient(310deg, #17ad37, #98ec2d);
    }
    .bg-gradient-warning {
        background: linear-gradient(310deg, #f53939, #fbcf33);
    }
    .bg-gradient-danger {
        background: linear-gradient(310deg, #ea0606, #ff667c);
    }
    .bg-gradient-dark {
        background: linear-gradient(310deg, #141727, #3a416f);
    }
    .bg-gradient-secondary {
        background: linear-gradient(310deg, #627594, #a8b8d8);
    }

    /* ══════════════════════════════════════════
     SHADOWS — LIGHT THEME
     ══════════════════════════════════════════ */
    .shadow-soft {
        box-shadow: 0 20px 27px 0 rgba(0, 0, 0, 0.05);
    }
    .shadow-soft-hover {
        box-shadow: 0 20px 27px 0 rgba(0, 0, 0, 0.08);
    }
    .shadow-dropdown {
        box-shadow: 0 8px 26px 0 rgba(0, 0, 0, 0.12);
    }
    .shadow-navbar {
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.04);
    }
    .shadow-inset {
        box-shadow: inset 0 3px 5px 0 rgba(0, 0, 0, 0.1);
    }
    .shadow-blur {
        box-shadow: 0 4px 6px 0 rgba(0, 0, 0, 0.12);
    }

    /* ══════════════════════════════════════════
     SHADOWS — DARK THEME OVERRIDES
     ══════════════════════════════════════════ */
    .dark .dark\:shadow-soft-dark {
        box-shadow: 0 20px 27px 0 rgba(0, 0, 0, 0.25);
    }
    .dark .dark\:shadow-none {
        box-shadow: none;
    }

    /* ══════════════════════════════════════════
     COLORED SHADOWS (same in both modes)
     Pair with matching bg-gradient-*
     ══════════════════════════════════════════ */
    .shadow-primary {
        box-shadow:
            0 3px 5px -1px rgba(203, 12, 159, 0.25),
            0 5px 12px -3px rgba(203, 12, 159, 0.2);
    }
    .shadow-info {
        box-shadow:
            0 3px 5px -1px rgba(23, 193, 232, 0.25),
            0 5px 12px -3px rgba(23, 193, 232, 0.2);
    }
    .shadow-success {
        box-shadow:
            0 3px 5px -1px rgba(130, 214, 22, 0.25),
            0 5px 12px -3px rgba(130, 214, 22, 0.2);
    }
    .shadow-warning {
        box-shadow:
            0 3px 5px -1px rgba(251, 207, 51, 0.25),
            0 5px 12px -3px rgba(251, 207, 51, 0.2);
    }
    .shadow-danger {
        box-shadow:
            0 3px 5px -1px rgba(234, 6, 6, 0.25),
            0 5px 12px -3px rgba(234, 6, 6, 0.2);
    }
    .shadow-dark {
        box-shadow:
            0 3px 5px -1px rgba(52, 71, 103, 0.25),
            0 5px 12px -3px rgba(52, 71, 103, 0.2);
    }

    /* ══════════════════════════════════════════
     BADGE UTILITIES (work in both modes)
     ══════════════════════════════════════════ */
    .badge-primary {
        background: rgba(203, 12, 159, 0.1);
        color: #cb0c9f;
    }
    .badge-success {
        background: rgba(130, 214, 22, 0.1);
        color: #82d616;
    }
    .badge-info {
        background: rgba(23, 193, 232, 0.1);
        color: #17c1e8;
    }
    .badge-warning {
        background: rgba(251, 207, 51, 0.1);
        color: #fbcf33;
    }
    .badge-danger {
        background: rgba(234, 6, 6, 0.1);
        color: #ea0606;
    }
    .badge-dark {
        background: rgba(52, 71, 103, 0.1);
        color: #344767;
    }
    .dark .badge-dark {
        background: rgba(255, 255, 255, 0.1);
        color: #ffffff;
    }

    /* ══════════════════════════════════════════
     FOCUS STATES
     ══════════════════════════════════════════ */
    .focus\:ring-primary\/15:focus {
        --tw-ring-color: rgba(203, 12, 159, 0.15);
    }
    .focus\:border-primary:focus {
        border-color: #cb0c9f;
    }

    /* ══════════════════════════════════════════
     HOVER HELPERS
     ══════════════════════════════════════════ */
    .dark .dark\:hover\:bg-white\/5:hover {
        background-color: rgba(255, 255, 255, 0.05);
    }
    .dark .dark\:hover\:text-white:hover {
        color: #ffffff;
    }

    /* ══════════════════════════════════════════
     ANIMATIONS
     ══════════════════════════════════════════ */
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(12px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    .animate-fade-in-up {
        animation: fadeInUp 0.4s ease-out both;
    }

    @keyframes shimmer {
        0% {
            background-position: -200% 0;
        }
        100% {
            background-position: 200% 0;
        }
    }
    .animate-shimmer {
        background: linear-gradient(
            90deg,
            #f0f0f0 25%,
            #e0e0e0 50%,
            #f0f0f0 75%
        );
        background-size: 200% 100%;
        animation: shimmer 1.5s infinite;
    }
    .dark .animate-shimmer {
        background: linear-gradient(
            90deg,
            #202940 25%,
            #2a3550 50%,
            #202940 75%
        );
        background-size: 200% 100%;
    }
</style>
```

## Dark Mode Color Map — Quick Reference

What changes between light and dark, and what stays the same:

### STAYS THE SAME (both themes)

- All gradient backgrounds (`bg-gradient-*`)
- All accent text colors (`text-primary`, `text-success`, `text-info`, `text-warning`, `text-danger`)
- All colored shadows (`shadow-primary`, `shadow-info`, etc.)
- All badge utilities (`badge-success`, etc.)
- All border radii
- All spacing values
- All font weights and sizes

### CHANGES PER THEME

| Element            | Light                       | Dark                             |
| ------------------ | --------------------------- | -------------------------------- |
| **Page bg**        | `bg-page`                   | `dark:bg-dark-page`              |
| **Card bg**        | `bg-white`                  | `dark:bg-dark-card`              |
| **Card shadow**    | `shadow-soft`               | `dark:shadow-soft-dark`          |
| **Heading text**   | `text-dark`                 | `dark:text-white`                |
| **Body text**      | `text-body`                 | `dark:text-white/60`             |
| **Muted text**     | `text-muted`                | `dark:text-white/40`             |
| **Dividers**       | `border-light`              | `dark:border-white/10`           |
| **Input border**   | `border-input`              | `dark:border-white/20`           |
| **Input bg**       | `bg-white`                  | `dark:bg-dark-card`              |
| **Input text**     | `text-body`                 | `dark:text-white/80`             |
| **Placeholder**    | `placeholder:text-gray-400` | `dark:placeholder:text-white/40` |
| **Avatar border**  | `border-white`              | `dark:border-dark-card`          |
| **Hover bg**       | `hover:bg-gray-50`          | `dark:hover:bg-white/5`          |
| **Inactive nav**   | `text-body`                 | `dark:text-white/60`             |
| **Sidebar bg**     | `bg-white`                  | `dark:bg-dark-page`              |
| **Toggle off**     | `bg-light`                  | `dark:bg-white/20`               |
| **Progress track** | `bg-light`                  | `dark:bg-white/10`               |
| **Timeline line**  | `bg-light`                  | `dark:bg-white/10`               |

## Class Cheat Sheet

### Surfaces

```
Light card:     bg-white rounded-2xl shadow-soft
Dark card:      dark:bg-dark-card dark:shadow-soft-dark
Always combine: bg-white dark:bg-dark-card rounded-2xl shadow-soft dark:shadow-soft-dark
```

### Text Hierarchy

```
Heading:   text-dark dark:text-white
Body:      text-body dark:text-white/60
Muted:     text-muted dark:text-white/40
Accent:    text-primary (no dark override needed)
On-gradient: text-white (no dark override needed)
```

### Borders

```
Divider:   border-b border-light dark:border-white/10
Input:     border border-input dark:border-white/20
Avatar:    border-2 border-white dark:border-dark-card
```

### Common Component Patterns

```
Card:       bg-white dark:bg-dark-card rounded-2xl shadow-soft dark:shadow-soft-dark
Button:     bg-gradient-primary shadow-primary text-white rounded-lg
Input:      bg-white dark:bg-dark-card border-input dark:border-white/20 rounded-lg text-body dark:text-white/80
Badge:      badge-success rounded-md text-xs font-bold px-2.5 py-1
Nav active: bg-gradient-primary shadow-primary text-white rounded-lg
Nav idle:   text-body dark:text-white/60 hover:bg-gray-50 dark:hover:bg-white/5 rounded-lg
```

### Spacing (Tailwind core — same both themes)

```
Card padding:    p-6
Card header:     px-6 pt-6 pb-0
Grid gap:        gap-6
Table row:       py-3 px-6
Nav item:        px-4 py-2.5
Button:          px-6 py-2.5
Badge:           px-2.5 py-1
```

### Radius (Tailwind core — same both themes)

```
Cards/modals:    rounded-2xl
Buttons/inputs:  rounded-lg
Icon containers: rounded-xl
Avatars/pills:   rounded-full
Badges:          rounded-md
```

## Gradient Start/End Pairs (for SVG/Recharts)

| Name      | Start     | End       |
| --------- | --------- | --------- |
| primary   | `#7928CA` | `#FF0080` |
| info      | `#2152FF` | `#21D4FD` |
| success   | `#17AD37` | `#98EC2D` |
| warning   | `#F53939` | `#FBCF33` |
| danger    | `#EA0606` | `#FF667C` |
| dark      | `#141727` | `#3A416F` |
| secondary | `#627594` | `#A8B8D8` |

### Recharts Example

```jsx
<defs>
  <linearGradient id="gradPrimary" x1="0" y1="0" x2="1" y2="0">
    <stop offset="0%" stopColor="#7928CA" />
    <stop offset="100%" stopColor="#FF0080" />
  </linearGradient>
</defs>
<Area fill="url(#gradPrimary)" stroke="#cb0c9f" />
```

## Full Example — Dark Mode Wrapper

```jsx
const [darkMode, setDarkMode] = useState(false);

return (
    <div className={darkMode ? "dark" : ""}>
        <div className="min-h-screen bg-page dark:bg-dark-page transition-colors duration-300">
            {/* Dark mode toggle */}
            <button
                onClick={() => setDarkMode(!darkMode)}
                className="px-4 py-2 rounded-lg bg-white dark:bg-dark-card shadow-soft dark:shadow-soft-dark text-dark dark:text-white text-sm font-semibold"
            >
                {darkMode ? "☀️ Light" : "🌙 Dark"}
            </button>

            {/* Example stat card */}
            <div className="bg-white dark:bg-dark-card rounded-2xl shadow-soft dark:shadow-soft-dark p-4">
                <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-gradient-primary shadow-primary flex items-center justify-center text-white">
                        💰
                    </div>
                    <div className="text-right">
                        <p className="text-sm text-body dark:text-white/60">
                            Today's Money
                        </p>
                        <h4 className="text-2xl font-bold text-dark dark:text-white">
                            $53,000
                        </h4>
                    </div>
                </div>
                <hr className="my-3 border-light dark:border-white/10" />
                <p className="text-sm text-body dark:text-white/60">
                    <span className="text-success font-bold">+55%</span> than
                    last week
                </p>
            </div>
        </div>
    </div>
);
```
