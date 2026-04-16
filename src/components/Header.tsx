'use client'

import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/Button'
import { getInitials } from '@/utils/helpers'
import { Bell, LogOut } from 'lucide-react'

export const Header = () => {
  const { user, logout } = useAuth()

  return (
    <header className="bg-card border-b border-border h-16 fixed top-0 left-64 right-0 flex items-center justify-between px-6 z-40">
      {/* Left Section */}
      <div className="flex items-center gap-4">
        <h1 className="text-xl font-bold text-foreground">Overview</h1>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* Notification */}
        <button className="p-2 hover:bg-muted rounded-lg transition-colors duration-200">
          <Bell className="w-5 h-5 text-muted-foreground" />
        </button>

        {/* User Avatar */}
        <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted transition-colors duration-200">
          <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold">
            {getInitials(user.name)}
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-medium text-foreground">{user.name}</p>
            <p className="text-xs text-muted-foreground">{user.role}</p>
          </div>
        </div>

        {/* Logout Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={logout}
          className="gap-2"
        >
          <LogOut className="w-4 h-4" />
          <span className="hidden sm:inline">Logout</span>
        </Button>
      </div>
    </header>
  )
}
