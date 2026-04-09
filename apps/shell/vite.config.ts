import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

// NOTE: @originjs/vite-plugin-federation does not support Vite's dev server for remotes.
// Remotes must be built first (vite build --watch) and served via vite preview.
// Run in two separate terminals:
//   Terminal 1: pnpm run dev:remotes   (build --watch + preview for all remotes)
//   Terminal 2: pnpm run dev:shell     (vite dev for the shell)
//
// For production, set environment variables:
//   VITE_MAIN_URL=https://main.netlify.app
//   VITE_PROFILE_URL=https://profile.netlify.app
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  const remotes = {
    'main': env.VITE_MAIN_URL ? `${env.VITE_MAIN_URL}/assets/remoteEntry.js` : 'http://localhost:3001/assets/remoteEntry.js',
    'auth': env.VITE_AUTH_URL ? `${env.VITE_AUTH_URL}/assets/remoteEntry.js` : 'http://localhost:3002/assets/remoteEntry.js',
  };

  return {
    plugins: [
      react(),
      federation({
        name: 'shell',
        remotes,
        shared: {
          react: { singleton: true, requiredVersion: '^18.0.0' },
          'react-dom': { singleton: true, requiredVersion: '^18.0.0' },
          'react-router-dom': { singleton: true, requiredVersion: '^6.0.0' },
          zustand: { singleton: true, requiredVersion: '^4.0.0' },
          '@tanstack/react-query': { singleton: true, requiredVersion: '^5.0.0' },
          '@crm/ui': { singleton: true },
          '@crm/utils': { singleton: true },
          '@crm/store': { singleton: true },
          recharts: { singleton: true, requiredVersion: '^3.0.0' },
        },
      }),
      {
        name: 'mock-auth-validate',
        configureServer(server) {
          server.middlewares.use((req, res, next) => {
            if (req.url === '/api/auth/validate') {
              const auth = req.headers.authorization || '';
              let user = null;
              if (auth.includes('admin-token')) user = { id: '1', email: 'admin@crm.com', name: 'Alex Morgan', role: 'admin', department: 'Management' };
              else if (auth.includes('manager-token')) user = { id: '2', email: 'manager@crm.com', name: 'Sarah Jenkins', role: 'manager', department: 'Sales' };
              else if (auth.includes('rep-token')) user = { id: '3', email: 'rep@crm.com', name: 'John Doe', role: 'sales_rep', department: 'Sales' };
              else if (auth.includes('exec-token')) user = { id: '4', email: 'exec@crm.com', name: 'Marcus Vane', role: 'executive', department: 'Executive' };

              res.setHeader('Content-Type', 'application/json');
              if (user) {
                res.statusCode = 200;
                res.end(JSON.stringify({ valid: true, user }));
              } else {
                res.statusCode = 401;
                res.end(JSON.stringify({ valid: false, message: 'Invalid token' }));
              }
              return;
            }
            next();
          });
        },
        configurePreviewServer(server) {
          server.middlewares.use((req, res, next) => {
            if (req.url === '/api/auth/validate') {
              const auth = req.headers.authorization || '';
              let user = null;
              if (auth.includes('admin-token')) user = { id: '1', email: 'admin@crm.com', name: 'Alex Morgan', role: 'admin', department: 'Management' };
              else if (auth.includes('manager-token')) user = { id: '2', email: 'manager@crm.com', name: 'Sarah Jenkins', role: 'manager', department: 'Sales' };
              else if (auth.includes('rep-token')) user = { id: '3', email: 'rep@crm.com', name: 'John Doe', role: 'sales_rep', department: 'Sales' };
              else if (auth.includes('exec-token')) user = { id: '4', email: 'exec@crm.com', name: 'Marcus Vane', role: 'executive', department: 'Executive' };

              res.setHeader('Content-Type', 'application/json');
              if (user) {
                res.statusCode = 200;
                res.end(JSON.stringify({ valid: true, user }));
              } else {
                res.statusCode = 401;
                res.end(JSON.stringify({ valid: false, message: 'Invalid token' }));
              }
              return;
            }
            next();
          });
        }
      }
    ],
    server: {
      port: 3000,
      strictPort: false,
      proxy: {
        '^/api/.*': {
          target: 'http://127.0.0.1:3005',
          changeOrigin: true,
          secure: false,
          configure: (proxy, _options) => {
            proxy.on('error', (err, _req, _res) => {
              console.log('proxy error', err);
            });
            proxy.on('proxyReq', (proxyReq, req, _res) => {
              console.log('Sending Request to the Target:', req.method, req.url);
            });
            proxy.on('proxyRes', (proxyRes, req, _res) => {
              console.log('Received Response from the Target:', proxyRes.statusCode, req.url);
            });
          }
        }
      }
    },
    build: {
      target: 'esnext',
      minify: false,
      cssCodeSplit: false,
    },
    preview: {
          "host":"0.0.0.0",
      port: 3000,
      strictPort: false,
      proxy: {
        '^/api/.*': {
          target: 'http://127.0.0.1:3005',
          changeOrigin: true,
          secure: false,
          configure: (proxy, _options) => {
            proxy.on('proxyReq', (proxyReq, req, _res) => {
              console.log('[Preview Proxy] Sending:', req.method, req.url);
            });
            proxy.on('proxyRes', (proxyRes, req, _res) => {
              console.log('[Preview Proxy] Received:', proxyRes.statusCode, req.url);
            });
          }
        }
      }
    },
  };
});
