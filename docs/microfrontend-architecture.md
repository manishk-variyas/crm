# Microfrontend Architecture Documentation

## Current Architecture: Module Federation with Shell + Features

This document describes the microfrontend architecture implemented in this CRM project and explains why this approach is preferable to having separate microfrontends for each page.

---

## Architecture Overview

```mermaid
graph TB
    subgraph "Browser"
        subgraph "Shell Application @crm/shell"
            S[Browser Router]
            L[Layout Component]
            T[Theme Provider]
            Q[React Query Provider]
        end
        
        subgraph "Feature Microfrontends"
            M[main<br/>Dashboard + All CRM Pages]
            A[auth<br/>Login + Authentication]
        end
        
        subgraph "Shared Packages"
            P1[ui<br/>Components Library]
            P2[store<br/>Zustand State]
            P3[utils<br/>Hooks + Utilities]
        end
    end
    
    S -->|/login| A
    S -->|/*| L
    L --> M
    M -.-> P1
    M -.-> P2
    M -.-> P3
    A -.-> P1
    L -.-> P1
    L -.-> P2
```

---

## Architecture Components

### 1. Shell Application (`@crm/shell`)
- **Purpose**: Container application that orchestrates all microfrontends
- **Responsibilities**:
  - Browser routing and URL management
  - Global layout (sidebar, header)
  - Theme provider and styling
  - Shared state management via `@crm/store`
  - React Query configuration
  - Loading states and error boundaries

### 2. Feature Microfrontends

| App | Port | Exposes | Routes |
|-----|------|---------|--------|
| `main` | 3001 | `./App` | `/dashboard`, `/accounts`, `/contacts`, `/opportunities`, `/pipeline`, `/quotes`, `/tasks`, `/reports`, `/settings`, `/directory` |
| `auth` | 3002 | `./App` | `/login` |

### 3. Shared Packages

| Package | Purpose |
|---------|---------|
| `@crm/ui` | Reusable UI components (Button, Card, Sidebar, Header, Charts) |
| `@crm/store` | Global state (theme, sidebar, notifications) via Zustand |
| `@crm/utils` | Custom hooks (useDebounce, useLocalStorage, useFetch) and formatters |

---

## Why This Architecture > Separate Microfrontends Per Page

### 1. Reduced Complexity

```mermaid
graph LR
    subgraph "Current (2 MFEs)"
        S1[Shell]
        M1[main]
    end
    
    subgraph "Alternative (10+ MFEs)"
        S2[Shell]
        M2[Dashboard]
        M3[Accounts]
        M4[Contacts]
        M5[Opportunities]
        M6[Pipeline]
        M7[Quotes]
        M8[Tasks]
        M9[Reports]
        M10[Settings]
        M11[Directory]
    end
    
    S1 --> M1
    S2 --> M2
    S2 --> M3
    S2 --> M4
    S2 --> M5
    S2 --> M6
    S2 --> M7
    S2 --> M8
    S2 --> M9
    S2 --> M10
    S2 --> M11
```

| Aspect | Current Architecture | Per-Page MFEs |
|--------|---------------------|---------------|
| Total MFEs | 2 (shell + features) | 11+ |
| Build pipelines | 2 | 11+ |
| Deployment targets | 2 | 11+ |
| Shared state complexity | Low | High |
| Bundle sharing | Simple | Complex |

### 2. Shared State Made Easy

```mermaid
sequenceDiagram
    participant S as Shell
    participant M as Main MFE
    participant Store as @crm/store
    
    S->>Store: Subscribe to theme
    M->>Store: Update theme preference
    Store-->>S: Notify theme change
    Store-->>M: Notify theme change
    S->>S: Re-render with new theme
    M->>M: Re-render with new theme
```

With per-page microfrontends, each needs its own store instance or complex state synchronization.

### 3. Consistent User Experience

```mermaid
graph TB
    subgraph "Theme Synchronization"
        T[Theme Provider]
        S[Sidebar]
        H[Header]
        D[Dashboard]
        A[Accounts]
    end
    
    T --> S
    T --> H
    T --> D
    T --> A
    
    style T fill:#90EE90
```

- Single theme provider in shell
- All features inherit consistent styling
- Zero configuration needed per-page

### 4. Faster Development

| Benefit | Explanation |
|---------|-------------|
| Shared components | UI library from `@crm/ui` used by all pages |
| Single deploy for pages | Adding a page = adding route in main MFE |
| Shared dependencies | React, React Router, QueryClient shared once |
| Simpler CI/CD | 2 pipelines vs 11+ |

### 5. Resource Efficiency

```mermaid
pie title Bundle Duplication Comparison
    "Current (2 MFEs)" : 30
    "Per-Page MFEs" : 85
```

- **Current**: React loaded once, shared via Module Federation
- **Per-Page**: Each MFE likely bundles its own React = 10x duplication

### 6. Routing Simplicity

```mermaid
graph TD
    subgraph "Current"
        R1[Shell Router<br/>2 routes]
    end
    
    subgraph "Per-Page"
        R2[Shell Router<br/>11 routes + Federation]
    end
```

- Shell handles routing to feature MFE
- Feature MFE handles internal page routing
- Clean separation of concerns

---

## When to Split Further

Consider adding new microfrontends when:

1. **Different teams** own different business domains
2. **Different deployment cycles** are needed
3. **Completely different tech stacks** required
4. **Isolated security** requirements (e.g., admin panel)

Example triggers:
- Finance team wants to deploy independently from Sales
- Need separate authentication flows
- Analytics dashboard has completely different UI patterns

---

## Configuration

```json
{
  "modules": [
    { "name": "shell", "type": "shell" },
    { "name": "main", "type": "feature", "port": 3001 },
    { "name": "auth", "type": "feature", "port": 3002 }
  ],
  "shared": {
    "ui": true,
    "store": true,
    "utils": true
  }
}
```

---

## Summary

| Criteria | Current (Recommended) | Per-Page MFEs |
|----------|----------------------|---------------|
| Complexity | Low | High |
| Development Speed | Fast | Slow |
| Shared State | Simple | Complex |
| Bundle Size | Optimized | Duplicated |
| Deployment | 2 targets | 11+ targets |
| Team Scalability | Good | Better (but overkill for this app) |

**Recommendation**: Keep current architecture. Split into more MFEs only when team size or deployment needs justify the complexity.