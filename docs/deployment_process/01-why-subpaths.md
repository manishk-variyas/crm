# 01 - Why Sub-path Deployment?

When deploying a Microfrontend (MFE) architecture, there are two main choices:
-   **Multi-domain**: `shell.com`, `main.com`, `auth.com`
-   **Sub-paths**: `crm.com/`, `crm.com/apps/main/`, `crm.com/apps/auth/`

## Why we chose Sub-paths for this CRM

### 1. Unified Authentication (Cookies / Session)
Most MFEs in a CRM need to know "Who is the user?" By using a single domain, we can set **HttpOnly** cookies for the root domain which are automatically sent to all routes. 

### 2. CORS Simplification
When `crm.com` (Shell) tries to load a remote script from `auth.com`, the browser triggers a CORS pre-flight check. On a single domain, this is avoided, leading to slightly faster load times and fewer configuration headaches.

### 3. SEO and Analytics
Search engines and analytics tools see the application as one single entity. You get aggregated user behavior data without having to set up cross-domain tracking.

---
**Key Concept**: "Same Origin" means `Protocol + Domain + Port` are the same.
