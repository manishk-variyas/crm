# 02 - Vite Configuration for Sub-paths

To deploy MFEs on sub-paths, we need to tell Vite that its assets will live in a specific folder.

## 1. Sub-App Configuration (`apps/main/vite.config.ts`)

We add the `base` property. This ensures that in the final `index.html`, script and link tags point to `/apps/main/assets/...` instead of `/assets/...`.

```typescript
export default defineConfig({
  base: '/apps/main/', // Prefix all generated assets with this path
  plugins: [
    // ... federation config
  ],
});
```

## 2. Shell Configuration (`apps/shell/vite.config.ts`)

The Shell needs to know where to find the `remoteEntry.js` of its children. In production, we use a relative path that starts with `/`:

```typescript
const remotes = {
  'main': mode === 'production' 
    ? '/apps/main/assets/remoteEntry.js' // Direct path under the main domain 
    : 'http://localhost:3001/assets/remoteEntry.js',
};
```

---
**Summary**: The `base` property is the most critical change here. Without it, the browser will look for `/assets/app.js` at the root, which belongs to the Shell.
