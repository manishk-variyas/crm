# 03 - Unified Build Orchestration

Since we are deploying everything on one domain, we need to physically gather all the `dist` folders from the different apps into a single directory structure.

## The Directory Structure

In production, the static file server should have this layout:

```text
/dist (Shell content)
  ├── index.html
  ├── assets/
  └── apps/
      ├── main/
      │   ├── remoteEntry.js
      │   └── assets/
      └── auth/
          ├── remoteEntry.js
          └── assets/
```

## The Build Script (`package.json`)

We can automate this process in the root `package.json`:

```json
{
  "scripts": {
    "build:unified": "pnpm -r build && pnpm orchestrate:dist",
    "orchestrate:dist": "mkdir -p apps/shell/dist/apps && cp -r apps/main/dist apps/shell/dist/apps/main && cp -r apps/auth/dist apps/shell/dist/apps/auth"
  }
}
```

---
**Learning Tip**: Each MFE build is completely independent. The "Orchestration" step is just a file organization step to make the server happy.
