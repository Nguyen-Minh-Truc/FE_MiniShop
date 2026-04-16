# Dashboard Application Structure

## Project Overview

Một Dashboard hiện đại được xây dựng với **React + TypeScript**, sử dụng **shadcn/ui** components và **Next.js 16** với App Router.

### Giao diện
- **Theme**: Dark mode hiện đại với purple gradient accent
- **Colors**: Deep blacks (background), subtle grays (cards), vibrant purple (accent)
- **Typography**: Geist font family
- **Components**: Responsive, accessible, animated

---

## Cấu trúc Folder

```
src/
├── components/           # UI components tái sử dụng
│   ├── Button/
│   │   ├── Button.tsx     # Button component
│   │   ├── Button.types.ts # TypeScript types
│   │   └── index.ts
│   ├── Sidebar.tsx        # Navigation sidebar
│   ├── Header.tsx         # Top header with user info
│   ├── MetricCard.tsx     # Dashboard metric card
│   ├── ChartComponent.tsx # Recharts wrapper
│   └── DataTable.tsx      # Data table component
│
├── pages/                 # Page-level components
│   ├── DashboardPage.tsx  # Main dashboard
│   ├── AnalyticsPage.tsx  # Analytics view
│   ├── UsersPage.tsx      # Users management
│   └── SettingsPage.tsx   # Settings page
│
├── hooks/                 # Custom hooks
│   └── useAuth.ts         # Authentication hook
│
├── services/              # API calls & data
│   └── mockData.ts        # Mock data for development
│
├── store/                 # State management
│   └── appStore.ts        # Zustand/Redux store (placeholder)
│
├── types/                 # Global TypeScript interfaces
│   └── index.ts           # Type definitions
│
├── utils/                 # Helper functions
│   └── helpers.ts         # Utility functions
│
├── app/                   # App configuration
│   ├── router.tsx         # Route definitions
│   └── store.types.ts     # Store type definitions
│
└── features/              # Feature modules (if needed)
    └── auth/              # Authentication feature
        ├── components/
        ├── hooks/
        ├── services/
        └── types/

app/
├── layout.tsx             # Root layout (dark mode enabled)
├── page.tsx               # Home page
└── globals.css            # Global styles + CSS variables
```

---

## Components

### Button Component
```tsx
import { Button } from '@/components/Button'

<Button variant="default" size="md" isLoading={false}>
  Click me
</Button>

// Variants: 'default' | 'secondary' | 'destructive' | 'outline' | 'ghost'
// Sizes: 'sm' | 'md' | 'lg'
```

### MetricCard Component
```tsx
import { MetricCard } from '@/components/MetricCard'

<MetricCard metric={{
  id: '1',
  label: 'Total Revenue',
  value: '$45,231.89',
  change: 12.5,
  changeType: 'increase',
  icon: 'TrendingUp'
}} />
```

### DataTable Component
```tsx
import { DataTable } from '@/components/DataTable'

<DataTable 
  title="Users"
  columns={['Name', 'Email', 'Status']}
  data={userData}
/>
```

### ChartComponent
```tsx
import { ChartComponent } from '@/components/ChartComponent'

<ChartComponent 
  title="Revenue"
  data={chartData}
/>
```

---

## Services & Data

### Mock Data (`src/services/mockData.ts`)
Chứa dữ liệu mô phỏng cho:
- User data
- Dashboard metrics
- Chart data
- Table data

### useAuth Hook
```tsx
const { user, logout, updateProfile } = useAuth()
```

---

## Utilities

### Helper Functions (`src/utils/helpers.ts`)
- `formatNumber(value)` - Format numbers (1000 → 1K)
- `formatCurrency(value)` - Format as currency
- `formatDate(date)` - Format dates
- `calculateChange(current, previous)` - Calculate percentage change
- `getInitials(name)` - Get name initials

---

## Routing

Routes được định nghĩa trong `src/app/router.tsx`:
- `/` - Home/Dashboard
- `/dashboard/analytics` - Analytics page
- `/dashboard/users` - Users management
- `/dashboard/settings` - Settings page

---

## Design System

### Colors (CSS Variables)
```css
--background: #1a1a1a (very dark)
--foreground: #f2f2f2 (light text)
--primary: #9333ea (purple)
--accent: #9333ea (purple)
--card: #262626 (dark card)
--border: #404040 (subtle border)
--muted: #525252 (muted text)
```

### Spacing
- Uses Tailwind's standard spacing scale (4px base)
- Padding: p-4, p-6 (common)
- Gaps: gap-4, gap-6 (common)

### Typography
- Font Family: Geist (sans-serif)
- Heading sizes: text-3xl, text-2xl, text-lg
- Body sizes: text-sm, text-base

---

## Getting Started

### Installation
```bash
pnpm install
```

### Development
```bash
pnpm dev
```

### Build
```bash
pnpm build
```

---

## Best Practices

1. **Component Organization**
   - Keep components focused and reusable
   - Use TypeScript for type safety
   - Export from index.ts for clean imports

2. **Styling**
   - Use Tailwind CSS utility classes
   - Follow CSS variable naming (--variable-name)
   - Maintain consistent spacing

3. **Data Flow**
   - Use hooks for state management
   - Mock services for development
   - Type all props and returns

4. **Folder Structure**
   - One component per file
   - Group related files in folders
   - Keep types close to usage

---

## Features Included

✅ Responsive layout with sidebar navigation
✅ Header with user profile & notifications
✅ Dashboard metrics cards with trends
✅ Line charts with Recharts
✅ Data table with actions
✅ Settings page with forms
✅ Analytics page
✅ User management page
✅ Dark theme (modern purple accent)
✅ TypeScript support
✅ Accessible components (shadcn/ui)

---

## Next Steps

1. Connect to real API endpoints
2. Implement state management (Zustand/Redux)
3. Add authentication flow
4. Create feature modules for larger features
5. Add unit tests
6. Configure environment variables

---

## Notes

- All data is currently mocked. Replace with actual API calls in services
- Authentication is a placeholder. Implement your auth flow
- Store configuration is ready for Zustand or Redux integration
- All components are fully typed with TypeScript
