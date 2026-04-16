# Development Guide

## Project Setup

### Prerequisites
- Node.js 18+
- pnpm (recommended) or npm

### Installation

```bash
# Clone and install dependencies
npm install

# Copy environment variables
cp .env.example .env.local
```

### Running Development Server

```bash
npm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the dashboard.

---

## Development Workflow

### Adding a New Page

1. Create page component in `src/pages/`
2. Wrap with Sidebar and Header components
3. Add route to `src/app/router.tsx`
4. Import and use in appropriate location

Example:
```tsx
// src/pages/NewPage.tsx
'use client'

import { Header } from '@/components/Header'
import { Sidebar } from '@/components/Sidebar'

export const NewPage = () => {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="ml-64 flex-1">
        <Header />
        <main className="pt-20 p-6">
          {/* Your content */}
        </main>
      </div>
    </div>
  )
}
```

### Adding a New Component

1. Create file in `src/components/`
2. Create corresponding .types.ts if needed
3. Export from index.ts
4. Use in pages

Example:
```tsx
// src/components/Card.tsx
interface CardProps {
  title: string
  children: React.ReactNode
}

export const Card = ({ title, children }: CardProps) => {
  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h3 className="text-lg font-semibold text-foreground">{title}</h3>
      {children}
    </div>
  )
}
```

### Adding API Services

```tsx
// src/services/userService.ts
import { User } from '@/types'

export const userService = {
  async getUsers(): Promise<User[]> {
    const response = await fetch('/api/users')
    return response.json()
  },

  async updateUser(id: string, data: Partial<User>) {
    const response = await fetch(`/api/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    })
    return response.json()
  },
}
```

### Adding Custom Hooks

```tsx
// src/hooks/useUsers.ts
'use client'

import { useEffect, useState } from 'react'
import { userService } from '@/services/userService'
import { User } from '@/types'

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await userService.getUsers()
        setUsers(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch')
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [])

  return { users, loading, error }
}
```

### Managing State

Current setup supports both Zustand and Redux. Example with Zustand:

```tsx
// src/store/userStore.ts
import { create } from 'zustand'
import { User } from '@/types'

interface UserStore {
  users: User[]
  setUsers: (users: User[]) => void
  addUser: (user: User) => void
}

export const useUserStore = create<UserStore>((set) => ({
  users: [],
  setUsers: (users) => set({ users }),
  addUser: (user) => set((state) => ({ users: [...state.users, user] })),
}))
```

---

## Styling Guide

### Using Tailwind Classes

```tsx
// Spacing
<div className="p-4 m-2 gap-2">

// Responsive
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">

// Colors (use CSS variables)
<div className="bg-card text-foreground border border-border">

// Hover/Active states
<button className="hover:bg-muted active:bg-muted/80">
```

### Creating New Color Variants

Update `app/globals.css`:

```css
:root {
  --success: oklch(0.68 0.15 142);
  --warning: oklch(0.80 0.15 67);
  --info: oklch(0.65 0.20 262);
}

@theme inline {
  --color-success: var(--success);
  --color-warning: var(--warning);
  --color-info: var(--info);
}
```

Then use:
```tsx
<div className="bg-success text-success-foreground">Success</div>
```

---

## Type Safety

All components should be typed:

```tsx
// ❌ Not typed
const Component = (props) => {
  return <div>{props.title}</div>
}

// ✅ Properly typed
interface ComponentProps {
  title: string
  onClick?: () => void
}

export const Component = ({ title, onClick }: ComponentProps) => {
  return <div onClick={onClick}>{title}</div>
}
```

---

## Testing

### Unit Tests

```bash
pnpm test
```

### Component Testing

Use Vitest + React Testing Library (add when needed)

---

## Debugging

### Debug Logs

```tsx
// Use descriptive console logs
console.log('[ComponentName] Rendering with props:', props)
console.log('[ServiceName] API response:', data)
```

### React DevTools

Install React DevTools browser extension for component inspection

### Next.js Debug

```bash
NODE_OPTIONS='--inspect' pnpm dev
```

---

## Performance Tips

1. **Use React.memo for expensive components**
   ```tsx
   export const ExpensiveComponent = React.memo(({ data }) => {
     return <div>{data}</div>
   })
   ```

2. **Code splitting with dynamic imports**
   ```tsx
   const Analytics = dynamic(() => import('@/pages/AnalyticsPage'), {
     loading: () => <div>Loading...</div>
   })
   ```

3. **Image optimization**
   ```tsx
   import Image from 'next/image'
   <Image src="/photo.jpg" alt="Photo" width={800} height={600} />
   ```

---

## Common Issues

### Path aliases not working
- Check tsconfig.json has correct paths
- Restart dev server after tsconfig changes

### Components not updating
- Check 'use client' directive at top of file
- Verify state updates are immutable

### Styling not applied
- Ensure Tailwind classes are spelled correctly
- Check CSS variable names in globals.css
- Clear browser cache if needed

---

## Useful Commands

```bash
# Development
pnpm dev              # Start dev server
pnpm build            # Build for production
pnpm start            # Run production build

# Code Quality
pnpm lint             # Run linter
pnpm format           # Format code

# Cleanup
pnpm clean            # Remove build artifacts
```

---

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [shadcn/ui](https://ui.shadcn.com)
- [Lucide Icons](https://lucide.dev)
