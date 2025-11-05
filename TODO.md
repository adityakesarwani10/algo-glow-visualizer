# TODO: Convert TypeScript to JavaScript

## Overview
Convert all .ts and .tsx files to .js and .jsx by removing TypeScript type annotations, renaming files, and updating imports. Ensure no build errors occur by testing after each batch.

## Steps
- [x] Update package.json and tsconfig.json to support JS (if needed) - tsconfig already allows JS with allowJs: true
- [x] Convert core files: main.tsx, App.tsx, vite-env.d.ts
- [x] Convert lib files: sortingAlgorithms.ts, utils.ts
- [x] Convert contexts: ThemeContext.tsx
- [x] Convert hooks: use-mobile.tsx, use-toast.ts
- [x] Convert pages: Index.tsx, NotFound.tsx
- [x] Convert components: AlgorithmVisualizer.tsx, ControlPanel.tsx, ThemeToggle.tsx, VisualizerBars.tsx
- [ ] Convert UI components (batch): all in components/ui/
- [ ] Update all import statements to use .js/.jsx extensions
- [ ] Test build after each major batch
- [ ] Final verification: run dev server and check for errors

## Notes
- Remove all type annotations, interfaces, and TypeScript-specific syntax.
- Rename files after conversion.
- Use search_files to find and update imports.
