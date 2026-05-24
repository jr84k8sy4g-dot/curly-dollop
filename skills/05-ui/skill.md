---
name: soft-ui-admin
description: Build stunning admin dashboards, back-office panels, and management interfaces using the Soft UI design language — characterized by soft neumorphic shadows, pastel gradients, generous border radii, and floating card layouts with full light/dark theme support. Use this skill whenever the user asks for an admin template, dashboard, CRM, analytics panel, settings page, user profile page, billing page, data table view, ecommerce panel, kanban board, or any internal-tool UI. Also trigger when the user mentions "soft ui", "neumorphic", "glassmorphism dashboard", "admin panel", "back-office", "management dashboard", or wants a modern, premium-feeling admin interface. This skill complements the frontend-design skill — use frontend-design for general creative web UIs, use this skill specifically for admin/dashboard contexts where data density, navigation hierarchy, and operational clarity matter alongside visual polish.
---

# Soft UI Admin Design System

This skill codifies the design patterns from Creative Tim's **Soft UI Dashboard PRO Tailwind** into a reusable system for building premium admin interfaces using **Tailwind CSS** with full **light and dark theme** support.

**Reference**: [Soft UI Dashboard PRO Tailwind — Live Demo](https://demos.creative-tim.com/soft-ui-dashboard-pro-tailwind/pages/dashboards/default.html) | [CRM](https://demos.creative-tim.com/soft-ui-dashboard-pro-tailwind/pages/dashboards/crm.html) | [Profile](https://demos.creative-tim.com/soft-ui-dashboard-pro-tailwind/pages/pages/profile/overview.html) | [Billing](https://demos.creative-tim.com/soft-ui-dashboard-pro-tailwind/pages/pages/account/billing.html) | [GitHub Source](https://github.com/creativetimofficial/ct-soft-ui-dashboard-pro-tailwind)

Before writing any code, read the reference file at `references/DESIGN_TOKENS.md` for the complete token system, the required `<style>` block, and the full dark theme class mappings.

## Tailwind Implementation Strategy

1. **Inject the `<style>` block** from `references/DESIGN_TOKENS.md` at the top of every artifact — it defines all custom colors, gradients, shadows, badges, and dark theme overrides
2. **Use `dark:` prefix** on all Tailwind classes for dark theme variants — the system uses `class` strategy via a `.dark` class on a parent container
3. **Use Tailwind core classes** for spacing, radius, layout, typography
4. **Use `style={{}}`** only when a value truly can't be a class (e.g., dynamic progress widths)
5. **Load Open Sans** via Google Fonts `<link>` tag

### Dark Mode Toggle Pattern

```jsx
const [darkMode, setDarkMode] = useState(false);

return (
    <div className={darkMode ? "dark" : ""}>
        <div className="min-h-screen bg-page dark:bg-dark-page">
            {/* All content here automatically picks up dark: variants */}
        </div>
    </div>
);
```

## Core Philosophy

Three pillars:

1. **Depth through shadow, not borders** — Cards float via `shadow-soft` / `dark:shadow-soft-dark`, never outlines
2. **Warmth through gradients, not flat color** — Interactive elements use `bg-gradient-*` classes (same in both themes)
3. **Breathing room through spacing, not emptiness** — `p-6` inside elements, `gap-6` between them

## Card System

Cards are THE fundamental building block. Every piece of content lives in a card.

### Base Card

```html
<div
    class="bg-white dark:bg-dark-card rounded-2xl border-0 shadow-soft dark:shadow-soft-dark relative overflow-visible"
>
    <div class="px-6 pt-6 pb-0 bg-transparent">
        <h6 class="text-dark dark:text-white font-bold text-lg">Title</h6>
        <p class="text-body dark:text-white/60 text-sm">Subtitle</p>
    </div>
    <div class="p-6">...content...</div>
</div>
```

### Card Variants

**1. Stat Card**

```html
<div
    class="bg-white dark:bg-dark-card rounded-2xl shadow-soft dark:shadow-soft-dark p-4"
>
    <div class="flex items-center justify-between">
        <div
            class="w-12 h-12 rounded-xl bg-gradient-info shadow-info flex items-center justify-center text-white"
        >
            <Icon size="{20}" />
        </div>
        <div class="text-right">
            <p class="text-sm text-body dark:text-white/60 mb-0">
                Users Active
            </p>
            <h4 class="text-2xl font-bold text-dark dark:text-white">1,600</h4>
        </div>
    </div>
    <hr class="my-3 border-light dark:border-white/10" />
    <p class="text-sm text-body dark:text-white/60">
        <span class="text-success font-bold">+55%</span> than last week
    </p>
</div>
```

**2. Content Card** — Tables, forms, lists

```html
<div
    class="bg-white dark:bg-dark-card rounded-2xl shadow-soft dark:shadow-soft-dark"
>
    <div class="px-6 pt-6 pb-0 flex items-center justify-between">
        <div>
            <h6 class="text-dark dark:text-white font-bold text-lg">
                Projects
            </h6>
            <p class="text-body dark:text-white/60 text-sm">
                30 done this month
            </p>
        </div>
        <button
            class="text-body dark:text-white/60 hover:text-dark dark:hover:text-white"
        >
            ...
        </button>
    </div>
    <div class="p-6">...content...</div>
</div>
```

**3. Profile/Hero Card**

```html
<div
    class="bg-white dark:bg-dark-card rounded-2xl shadow-soft dark:shadow-soft-dark overflow-hidden"
>
    <div
        class="h-48 bg-cover bg-center rounded-2xl"
        style="backgroundImage: 'url(...)'"
    ></div>
    <div class="flex flex-col items-center -mt-12 pb-6">
        <img
            class="w-20 h-20 rounded-full border-4 border-white dark:border-dark-card shadow-soft"
            src="..."
        />
        <h5 class="text-dark dark:text-white font-bold mt-3">Alec Thompson</h5>
        <p class="text-body dark:text-white/60 text-sm">CEO / Co-Founder</p>
    </div>
</div>
```

**4. Project Card** — Image + description + avatar group

```html
<div
    class="bg-white dark:bg-dark-card rounded-2xl shadow-soft dark:shadow-soft-dark p-4"
>
    <img class="w-full rounded-xl shadow-blur" src="..." />
    <p
        class="text-[0.65rem] text-body dark:text-white/60 font-bold uppercase tracking-wide mt-4"
    >
        Project #2
    </p>
    <h5 class="text-dark dark:text-white font-bold text-lg mt-1">Modern</h5>
    <p class="text-body dark:text-white/60 text-sm mt-2">Description...</p>
    <div class="flex items-center justify-between mt-4">
        <a class="text-dark dark:text-white font-bold text-sm"
            >View Project →</a
        >
        <div class="flex -space-x-3">
            <img
                class="w-6 h-6 rounded-full border-2 border-white dark:border-dark-card"
                src="..."
            />
        </div>
    </div>
</div>
```

**5. Dark/Gradient Card** — CTAs (same in both themes)

```html
<div
    class="rounded-2xl shadow-soft bg-gradient-dark text-white p-6 relative overflow-hidden"
>
    <h5 class="font-bold text-lg">Work with the rockets</h5>
    <p class="text-white/70 text-sm mt-2">Description...</p>
    <button
        class="mt-4 px-6 py-2.5 rounded-lg bg-white text-dark text-xs font-bold uppercase tracking-wide"
    >
        Read More
    </button>
</div>
```

**6. Credit Card Style**

```html
<div class="rounded-2xl shadow-soft bg-gradient-dark text-white p-6">
    <p class="text-lg tracking-widest font-semibold">
        4562 &nbsp; 1122 &nbsp; 4594 &nbsp; 7852
    </p>
    <div class="flex justify-between items-end mt-8">
        <div>
            <p class="text-xs text-white/60 uppercase">Card Holder</p>
            <p class="text-sm font-bold">Jack Peterson</p>
        </div>
        <div>
            <p class="text-xs text-white/60 uppercase">Expires</p>
            <p class="text-sm font-bold">11/22</p>
        </div>
    </div>
</div>
```

## Color System

### Theme Colors (Flat — from SCSS `$soft-ui-theme-colors`)

| Token     | Value     | Light Class      | Dark Class            |
| --------- | --------- | ---------------- | --------------------- |
| primary   | `#cb0c9f` | `text-primary`   | `text-primary` (same) |
| secondary | `#8392ab` | `text-secondary` | `dark:text-white/60`  |
| success   | `#82d616` | `text-success`   | `text-success` (same) |
| info      | `#17c1e8` | `text-info`      | `text-info` (same)    |
| warning   | `#fbcf33` | `text-warning`   | `text-warning` (same) |
| danger    | `#ea0606` | `text-danger`    | `text-danger` (same)  |
| dark      | `#344767` | `text-dark`      | `dark:text-white`     |
| body      | `#67748e` | `text-body`      | `dark:text-white/60`  |
| muted     | `#8392ab` | `text-muted`     | `dark:text-white/40`  |

**Key rule**: Accent/status colors (primary, success, info, warning, danger) stay the same in both themes. Only neutral text, backgrounds, borders, and surfaces change.

### Gradient Backgrounds (Same in both themes)

| Utility Class           | Gradient                                    |
| ----------------------- | ------------------------------------------- |
| `bg-gradient-primary`   | `linear-gradient(310deg, #7928CA, #FF0080)` |
| `bg-gradient-info`      | `linear-gradient(310deg, #2152FF, #21D4FD)` |
| `bg-gradient-success`   | `linear-gradient(310deg, #17AD37, #98EC2D)` |
| `bg-gradient-warning`   | `linear-gradient(310deg, #F53939, #FBCF33)` |
| `bg-gradient-danger`    | `linear-gradient(310deg, #EA0606, #FF667C)` |
| `bg-gradient-dark`      | `linear-gradient(310deg, #141727, #3A416F)` |
| `bg-gradient-secondary` | `linear-gradient(310deg, #627594, #A8B8D8)` |

### Surface & Background Colors

| Role        | Light Value | Light Class      | Dark Value  | Dark Class          |
| ----------- | ----------- | ---------------- | ----------- | ------------------- |
| Page bg     | `#f8f9fa`   | `bg-page`        | `#1a1f36`   | `dark:bg-dark-page` |
| Card bg     | `#ffffff`   | `bg-white`       | `#202940`   | `dark:bg-dark-card` |
| Card header | transparent | `bg-transparent` | transparent | same                |
| Sidebar bg  | `#ffffff`   | `bg-white`       | `#1a1f36`   | `dark:bg-dark-page` |
| Input bg    | `#ffffff`   | `bg-white`       | `#202940`   | `dark:bg-dark-card` |

### Border Colors

| Role          | Light          | Dark                   |
| ------------- | -------------- | ---------------------- |
| Dividers      | `border-light` | `dark:border-white/10` |
| Input borders | `border-input` | `dark:border-white/20` |
| Table rows    | `border-light` | `dark:border-white/10` |

### Shadow System

| Utility           | Light                            | Dark Equivalent         |
| ----------------- | -------------------------------- | ----------------------- |
| `shadow-soft`     | `0 20px 27px 0 rgba(0,0,0,0.05)` | `dark:shadow-soft-dark` |
| `shadow-dropdown` | `0 8px 26px 0 rgba(0,0,0,0.12)`  | same (works in dark)    |
| `shadow-navbar`   | `0 2px 12px 0 rgba(0,0,0,0.04)`  | `dark:shadow-soft-dark` |
| `shadow-primary`  | colored shadow, 25% opacity      | same (works in dark)    |
| Colored shadows   | all `shadow-{name}` classes      | same (works in dark)    |

## Typography

| Element     | Light Classes                                                | Dark Override         |
| ----------- | ------------------------------------------------------------ | --------------------- |
| Heading     | `text-lg font-bold text-dark`                                | `dark:text-white`     |
| Body text   | `text-sm text-body leading-relaxed`                          | `dark:text-white/60`  |
| Muted text  | `text-xs text-muted`                                         | `dark:text-white/40`  |
| Small label | `text-[0.65rem] font-bold uppercase tracking-wide text-body` | `dark:text-white/60`  |
| KPI number  | `text-2xl font-bold text-dark`                               | `dark:text-white`     |
| Button text | `text-xs font-bold uppercase tracking-wide text-white`       | same (on gradient bg) |
| Link text   | `text-sm font-bold text-dark`                                | `dark:text-white`     |

Font: `"Open Sans", sans-serif` — set globally via the `<style>` block.

## Border Radius (Same in both themes)

| Element          | Tailwind Class |
| ---------------- | -------------- |
| Cards / modals   | `rounded-2xl`  |
| Buttons / inputs | `rounded-lg`   |
| Icon containers  | `rounded-xl`   |
| Avatars / pills  | `rounded-full` |
| Thumbnails       | `rounded-xl`   |
| Badges           | `rounded-md`   |
| Progress bars    | `rounded-lg`   |

## Component Patterns

### Navigation (Sidebar)

```html
<!-- Active item -->
<a
    class="flex items-center gap-3 px-4 py-2.5 rounded-lg bg-gradient-primary shadow-primary text-white text-sm font-semibold"
>
    <Icon size="{14}" /> Dashboard
</a>
<!-- Inactive item -->
<a
    class="flex items-center gap-3 px-4 py-2.5 rounded-lg text-body dark:text-white/60 text-sm font-semibold hover:bg-gray-50 dark:hover:bg-white/5"
>
    <Icon size="{14}" /> Tables
</a>
<!-- Section label -->
<p
    class="text-[0.65rem] font-bold uppercase tracking-wide text-body dark:text-white/40 px-4 mt-4 mb-2"
>
    PAGES
</p>
```

Sidebar background: `bg-white dark:bg-dark-page`. Sidebar supports collapsible sub-menus and mini (icon-only) mode.

### Tables

```html
<table class="w-full">
    <thead>
        <tr>
            <th
                class="text-left text-[0.65rem] font-bold uppercase tracking-wide text-body dark:text-white/40 pb-3 px-6"
            >
                Author
            </th>
        </tr>
    </thead>
    <tbody>
        <tr class="border-b border-light dark:border-white/10">
            <td class="py-3 px-6">
                <div class="flex items-center gap-3">
                    <img class="w-9 h-9 rounded-full" src="..." />
                    <div>
                        <p class="text-sm font-bold text-dark dark:text-white">
                            John Michael
                        </p>
                        <p class="text-xs text-body dark:text-white/60">
                            [email protected]
                        </p>
                    </div>
                </div>
            </td>
        </tr>
    </tbody>
</table>
```

### Buttons

```html
<!-- Primary gradient -->
<button
    class="px-6 py-2.5 rounded-lg bg-gradient-primary shadow-primary text-white text-xs font-bold uppercase tracking-wide transition-all duration-150 hover:-translate-y-px"
>
    Action
</button>
<!-- Outline -->
<button
    class="px-6 py-2.5 rounded-lg bg-transparent border border-primary text-primary text-xs font-bold uppercase tracking-wide hover:bg-primary hover:text-white transition-all duration-150"
>
    Action
</button>
```

### Form Inputs

```html
<label class="text-xs font-bold text-dark dark:text-white mb-1 block"
    >Email</label
>
<input
    class="w-full px-3 py-2 text-sm text-body dark:text-white/80 bg-white dark:bg-dark-card border border-input dark:border-white/20 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/15 outline-none transition-all placeholder:text-gray-400 dark:placeholder:text-white/40"
/>
```

### Toggle Switches

```html
<!-- Active -->
<button
    class="relative w-10 h-5 rounded-full bg-gradient-primary transition-all"
>
    <span
        class="absolute right-0.5 top-0.5 w-4 h-4 rounded-full bg-white shadow-sm"
    ></span>
</button>
<!-- Inactive -->
<button
    class="relative w-10 h-5 rounded-full bg-light dark:bg-white/20 transition-all"
>
    <span
        class="absolute left-0.5 top-0.5 w-4 h-4 rounded-full bg-white shadow-sm"
    ></span>
</button>
```

### Badges

```html
<span class="badge-success text-xs font-bold px-2.5 py-1 rounded-md"
    >Online</span
>
<span class="badge-danger text-xs font-bold px-2.5 py-1 rounded-md"
    >Offline</span
>
```

Badge utilities work in both themes — tinted backgrounds remain readable on dark surfaces.

### Avatar Groups

```html
<div class="flex -space-x-3">
    <img
        class="w-9 h-9 rounded-full border-2 border-white dark:border-dark-card"
        src="..."
    />
    <img
        class="w-9 h-9 rounded-full border-2 border-white dark:border-dark-card"
        src="..."
    />
    <span
        class="w-9 h-9 rounded-full border-2 border-white dark:border-dark-card bg-gradient-dark text-white text-xs font-bold flex items-center justify-center"
        >+4</span
    >
</div>
```

### Progress Bars

```html
<div class="w-full h-1.5 bg-light dark:bg-white/10 rounded-lg overflow-hidden">
    <div class="h-full rounded-lg bg-gradient-info" style="width: 60%"></div>
</div>
```

### Timeline / Activity List

```html
<div class="relative pl-6">
    <div
        class="absolute left-2.5 top-0 bottom-0 w-px bg-light dark:bg-white/10"
    ></div>
    <div class="relative flex items-start gap-3 pb-4">
        <div
            class="absolute left-[-14px] w-3 h-3 rounded-full bg-gradient-success shadow-success mt-1"
        ></div>
        <div>
            <p class="text-sm font-bold text-dark dark:text-white">
                $2400, Design changes
            </p>
            <p class="text-xs text-muted dark:text-white/40">22 DEC 7:20 PM</p>
        </div>
    </div>
</div>
```

### Transaction / Invoice List

```html
<div
    class="flex items-center justify-between py-3 border-b border-light dark:border-white/10"
>
    <div>
        <p class="text-sm font-bold text-dark dark:text-white">Netflix</p>
        <p class="text-xs text-body dark:text-white/60">
            27 March 2020, at 12:30 PM
        </p>
    </div>
    <span class="text-sm font-bold text-danger">- $ 2,500</span>
</div>
```

## Animation & Interaction

| Interaction  | Classes                                                                                     |
| ------------ | ------------------------------------------------------------------------------------------- |
| Card hover   | `hover:-translate-y-0.5 hover:shadow-soft-hover transition-all duration-300`                |
| Button hover | `hover:-translate-y-px transition-all duration-150`                                         |
| Image hover  | Container: `overflow-hidden`. Image: `hover:scale-[1.02] transition-transform duration-300` |
| General      | `transition-all duration-300 ease-out`                                                      |

## Anti-Patterns (What NOT to Do)

- **No borders on cards** — `shadow-soft` / `dark:shadow-soft-dark` only
- **No flat-colored buttons** — always `bg-gradient-*` for primary actions
- **No sharp corners** — minimum `rounded-lg` on everything interactive
- **No pure black text** — `text-dark dark:text-white`, never `text-black`
- **No bright page backgrounds** — `bg-page dark:bg-dark-page`
- **No `text-white` without `dark:` context** — always pair light + dark classes for text
- **No forgetting dark mode** — EVERY surface, text, and border needs both light and `dark:` variants
- **No changing gradient colors per theme** — gradients are identical in light and dark
- **No changing accent colors per theme** — primary, success, info, warning, danger stay constant
