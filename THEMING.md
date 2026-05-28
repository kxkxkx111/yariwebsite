# Theming Dr. Yary

Everything that defines the brand — four colors, two fonts, the heading weight —
lives in **two files**. Touch nothing else.

## Where to change colors

`lib/theme.ts` → `theme.colors`

| Key          | What it controls                                                       |
|--------------|------------------------------------------------------------------------|
| `background` | Page background and the default surface color                          |
| `foreground` | Primary text and the default dark CTA background                       |
| `accent`     | Headline accent words, hover states, decorative borders, focus marks   |
| `deep`       | Footer background and the dark CTA bands on light pages                |

Save the file. The dev server hot-reloads.

## Where to change fonts

`app/fonts.ts`

Swap the imports at the top — any font from <https://fonts.google.com> is fair game.
Keep the `variable` keys (`--font-sans-face`, `--font-display-face`) unchanged so the
rest of the site keeps resolving correctly.

## Heading weight

`lib/theme.ts` → `theme.typography.headingWeight`

Possible values: `300` (Light), `400` (Regular), `500` (Medium), `600` (Semibold,
the current default), `700` (Bold), `800` (ExtraBold).

## Common changes

```ts
// "Make headlines bolder"
typography: { headingWeight: 700, ... }

// "Make the accent more orange"
colors: { accent: "#E69468", ... }

// "Pure-black footer"
colors: { deep: "#000000", ... }

// "Slightly tighter headline tracking"
typography: { headingTracking: -0.03, ... }
```

## Do not edit

`app/globals.css` — it just plumbs `lib/theme.ts` into Tailwind. Brand changes
belong in `lib/theme.ts`. Component changes belong in the relevant `.tsx` file.
