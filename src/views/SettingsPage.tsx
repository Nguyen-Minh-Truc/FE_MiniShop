'use client'

import { Header } from '@/components/Header'
import { Sidebar } from '@/components/Sidebar'
import { Button } from '@/components/Button'
import { Card } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'

export const SettingsPage = () => {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />

      <div className="ml-64 flex-1">
        <Header />

        <main className="pt-20 p-6 space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Settings</h1>
            <p className="text-muted-foreground mt-2">
              Manage your account and application settings.
            </p>
          </div>

          {/* Account Settings */}
          <Card className="p-6 border border-border bg-card">
            <h3 className="text-lg font-semibold text-foreground mb-6">Account Settings</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground">Email</label>
                <input
                  type="email"
                  value="alex@example.com"
                  readOnly
                  className="mt-2 w-full px-4 py-2 bg-muted text-foreground rounded-lg border border-border"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Display Name</label>
                <input
                  type="text"
                  value="Alex Johnson"
                  className="mt-2 w-full px-4 py-2 bg-input text-foreground rounded-lg border border-border"
                />
              </div>
            </div>
            <Button variant="default" className="mt-6">Save Changes</Button>
          </Card>

          {/* Notification Settings */}
          <Card className="p-6 border border-border bg-card">
            <h3 className="text-lg font-semibold text-foreground mb-6">Notifications</h3>
            <div className="space-y-4">
              {[
                { label: 'Email Notifications', desc: 'Receive email updates' },
                { label: 'Push Notifications', desc: 'Receive push alerts' },
                { label: 'Weekly Summary', desc: 'Get weekly summary emails' },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">{item.label}</p>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                  <Switch />
                </div>
              ))}
            </div>
          </Card>

          {/* Security Settings */}
          <Card className="p-6 border border-border bg-card">
            <h3 className="text-lg font-semibold text-foreground mb-6">Security</h3>
            <div className="space-y-4">
              <Button variant="outline" className="w-full">
                Change Password
              </Button>
              <Button variant="outline" className="w-full">
                Enable Two-Factor Authentication
              </Button>
              <Button variant="destructive" className="w-full">
                Delete Account
              </Button>
            </div>
          </Card>
        </main>
      </div>
    </div>
  )
}
