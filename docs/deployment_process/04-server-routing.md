# 04 - Server Routing & Redirects

When using sub-paths for Single Page Applications (SPAs), you must ensure that refreshes (e.g., hitting F5 on `/apps/main/dashboard`) don't return a 404 from the server.

## 1. Netlify Strategy (`_redirects`)

Each sub-app needs its own redirect rule.

```text
# Map everything under /apps/main to its index.html
/apps/main/*  /apps/main/index.html  200

# Map everything under /apps/auth to its index.html
/apps/auth/*  /apps/auth/index.html  200

# Everything else goes to the Shell
/*  /index.html  200
```

## 2. Nginx Strategy (`nginx.conf`)

If using Nginx, you would use `alias`:

```nginx
location /apps/main/ {
    alias /usr/share/nginx/html/apps/main/;
    try_files $uri $uri/ /apps/main/index.html;
}

location / {
    root /usr/share/nginx/html/;
    try_files $uri $uri/ /index.html;
}
```

---
**Key Takeaway**: Every entry point in a sub-path needs its own "Fallback" to its own `index.html`.
