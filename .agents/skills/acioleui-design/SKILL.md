---
name: acioleui-design
description: Use when building, refactoring, reviewing, or debugging React interfaces that use the AcioleUI component library, the acioleui npm package, AcioleUI design tokens, themes, icons, overlays, forms, navigation, data display, or layout primitives.
---

# acioleui design

Use AcioleUI as the application's UI system. Reuse its components, semantic tokens, providers, hooks, and icons before creating local equivalents.

## Required setup

Load `acioleui/styles` once at the application entry point and use the existing `ThemeProvider` at the application root:

```tsx
import "acioleui/styles";
import { ThemeProvider } from "acioleui";

<ThemeProvider defaultTheme="light">{children}</ThemeProvider>;
```

`ThemeProvider` already includes toast infrastructure. Do not add a second ToastProvider.

## Workflow

1. Translate the request into component roles: layout, typography, forms, feedback, overlays, navigation, or data display.
2. Reuse AcioleUI primitives and semantic tokens before writing local CSS or components.
3. Verify exact props from the installed package types before implementing non-trivial UI.
4. Keep components in their own folders and separate UI, business rules, and data access.
5. Preserve controlled React behavior, keyboard semantics, labels, ARIA, loading, empty, and error states.
6. Run TypeScript and build validation before finishing.
