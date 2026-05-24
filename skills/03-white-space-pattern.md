---
name: ui-whitespace-design
description: >
    Apply consistent white space design patterns when building, reviewing, or critiquing any UI —
    including web pages, React components, dashboards, forms, modals, cards, and mobile layouts.
    Use this skill whenever the user asks to design, style, improve, or audit a UI for spacing,
    layout breathing room, padding, margin, visual hierarchy, or overall aesthetics. Also trigger
    when the user says something feels "too cramped," "cluttered," "busy," or "hard to read."
    This skill defines the accepted spacing system, rules, and patterns Claude should follow
    to produce professional, breathable, and visually coherent interfaces.
---

# UI White Space Design Pattern

White space (negative space) is the deliberate absence of content. It is not empty — it is a
primary tool for establishing hierarchy, grouping, readability, and perceived quality in UI design.

---

## Core Principle

> **Space communicates relationship.**
> Elements close together feel related. Elements with space between them feel independent.
> Use this to build visual hierarchy without relying solely on size or color.

---

## Spacing Scale (Tailwind CSS Aligned)

Tailwind's spacing scale is based on **0.25rem = 4px per unit**, so every class maps
directly to a pixel value: `p-1` = 4px, `p-2` = 8px, `p-4` = 16px, etc. Always use Tailwind
class names — never arbitrary pixel values.

| Tailwind Class | Value | Use case                                      |
| -------------- | ----- | --------------------------------------------- |
| `p-1`          | 4px   | Micro gaps — icon-to-label, badge padding     |
| `p-2`          | 8px   | Tight internal padding — chips, small buttons |
| `p-3`          | 12px  | Form field internal padding                   |
| `p-4`          | 16px  | Standard component padding (cards, inputs)    |
| `p-5`          | 20px  | Slightly relaxed component padding            |
| `p-6`          | 24px  | Section gaps within a component               |
| `p-8`          | 32px  | Between sibling components                    |
| `p-12`         | 48px  | Between major layout sections                 |
| `p-16`         | 64px  | Hero/page-level vertical rhythm               |
| `p-24`         | 96px  | Large-scale section separation                |

> **Rule:** Always use Tailwind's spacing classes. The same scale applies to `m-*`, `gap-*`,
> `space-x-*`, and `space-y-*` utilities — not just padding.

---

## Two Types of White Space

### 1. Macro White Space

Large-scale breathing room between major layout regions.

- Between page sections: `py-12` to `py-16` (48px–64px)
- Page horizontal margins: `px-4` mobile, `px-8` tablet, `px-16` to `px-24` desktop
- Between grid columns: `gap-4` to `gap-6` (16px–24px)

**Purpose:** Establishes page rhythm, separates distinct content zones.

### 2. Micro White Space

Fine-grained spacing inside components.

- Line height: `leading-normal` (1.5×) for body text, `leading-tight` (1.25×) for headings
- Letter spacing: `tracking-normal` for body; `tracking-wide` or `tracking-wider` for uppercase labels
- Paragraph margin-bottom: `mb-4` to `mb-6` (16px–24px)
- List item gap: `space-y-2` to `space-y-3` (8px–12px)

**Purpose:** Readability, scanability, and reducing cognitive load.

---

## Component-Level Rules

### Cards

```
p-5 or p-6          → internal padding (20px–24px)
gap-3 or gap-4      → between card elements (12px–16px)
gap-4 or gap-6      → between cards in a grid (16px–24px)
```

### Buttons

```
px-4 py-2           → default button (16px / 8px)
px-6 py-3           → large button (24px / 12px)
gap-2               → icon-to-label gap (8px)
min-h: 36px (sm), 44px (default), 52px (lg)
```

### Forms & Inputs

```
px-3 py-2 or px-4 py-3   → input internal padding
space-y-4                 → between form fields (16px)
space-y-5                 → relaxed form fields (20px)
gap-1 or gap-1.5          → label-to-input gap (4px–6px)
mt-8                      → between form sections (32px)
```

### Navigation

```
px-4 py-2 or py-3         → nav item padding
gap-1 or gap-2            → between nav links
ml-8                      → logo-to-nav gap (32px)
```

### Modals & Dialogs

```
p-6 or p-8                → modal padding (24px–32px)
space-y-5 or space-y-6    → between modal sections
gap-2 or gap-3            → button group gap (8px–12px)
```

### Typography Hierarchy Spacing

```
mb-6    → h1 margin-bottom (24px)
mb-5    → h2 margin-bottom (20px)
mb-4    → h3 margin-bottom (16px)
mb-4    → body paragraph margin-bottom (16px)
mb-1    → caption/label margin-bottom (4px)
leading-normal (1.5) → body line-height
leading-tight (1.25) → heading line-height
```

---

## Active vs. Passive White Space

| Type    | Definition                                                  | Example                       |
| ------- | ----------------------------------------------------------- | ----------------------------- |
| Active  | Intentionally placed to direct attention or create emphasis | Space isolating a primary CTA |
| Passive | Natural space from defaults — margins, gutters, line-height | Default paragraph margins     |

**Rule:** Every CTA (call-to-action) must have at least `p-6` (24px) of active white space
surrounding it on all sides. This isolation creates visual weight without added styling.

---

## Gestalt Grouping Rules

Apply these when deciding spacing between elements:

- **Law of Proximity:** Items 8px apart feel related; items 32px+ apart feel separate.
- **Law of Similarity:** Consistent spacing within a group signals membership.
- **Law of Closure:** Use padding (not just borders) to define enclosed regions.

**Practical rule:** The gap _between_ groups must always be at least **2× the gap within** a group.

```
Example:
  - Items inside a card group: gap-3 (12px apart)
  - Gap between two card groups: gap-8 (32px apart) ✓
```

---

## Responsive White Space Behavior

White space should scale with viewport — don't keep spacing fixed across breakpoints.

| Breakpoint               | Horizontal margin         | Section vertical gap      |
| ------------------------ | ------------------------- | ------------------------- |
| Mobile (`sm` <640px)     | `px-4` (16px)             | `py-10` (40px)            |
| Tablet (`md` 640–1024px) | `px-8` (32px)             | `py-14` (56px)            |
| Desktop (`lg` >1024px)   | `px-16`–`px-24` (64–96px) | `py-16`–`py-24` (64–96px) |

**Rule:** Reduce spacing proportionally on mobile — but never eliminate it. A minimum of `px-4`
(16px) horizontal padding and `py-8` (32px) section spacing must always be maintained.

---

## Common Anti-Patterns to Avoid

| Anti-Pattern                        | Problem                                | Fix                                         |
| ----------------------------------- | -------------------------------------- | ------------------------------------------- |
| Zero-margin text blocks             | Claustrophobic, hard to scan           | Add `mb-4`+ between paragraphs              |
| Cramped form fields                 | Error-prone, stressful UX              | Use `space-y-4` between fields              |
| Full-width text on large screens    | Line length too long (> 75 chars)      | Cap width with `max-w-prose` or `max-w-2xl` |
| Inconsistent spacing (arbitrary px) | Looks unpolished, breaks visual rhythm | Always use Tailwind spacing classes         |
| Button touching container edge      | CTA has no breathing room              | Ensure `m-6`+ around CTAs                   |
| Icon flush against label            | Hard to read, feels unfinished         | Use `gap-2` (8px)                           |

---

## Quality Checklist

Before finalizing any UI, verify:

- [ ] All spacing uses Tailwind classes (`p-*`, `m-*`, `gap-*`, `space-y-*`) — no arbitrary px values
- [ ] Section-to-section gaps use at least `py-12` (48px)
- [ ] Primary CTAs have at least `m-6` (24px) isolation on all sides
- [ ] Body text uses `leading-normal` (line-height 1.5)
- [ ] Inter-group gap is at least 2× intra-group gap (e.g., `gap-8` between groups, `gap-3` within)
- [ ] Form fields are separated by `space-y-4` or more
- [ ] Reading content is capped with `max-w-prose` or `max-w-2xl`
- [ ] Horizontal margins are responsive: `px-4 md:px-8 lg:px-16`
- [ ] No hardcoded pixel values outside of Tailwind's scale

---

## Summary

White space is not decoration — it is structure. Apply it deliberately, consistently, and
proportionally. When in doubt, add more space. Premium, trustworthy interfaces almost always
use more white space than feels comfortable at first glance.
