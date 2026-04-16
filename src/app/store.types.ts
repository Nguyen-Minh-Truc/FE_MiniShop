import { User } from '@/types/index'

export interface AppState {
  user: User | null
  isLoading: boolean
  error: string | null
  theme: 'light' | 'dark'
  sidebarOpen: boolean
}

export interface AuthState {
  isAuthenticated: boolean
  user: User | null
  token: string | null
}
