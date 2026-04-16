'use client'

import { Header } from '@/components/Header'
import { Sidebar } from '@/components/Sidebar'
import { DataTable } from '@/components/DataTable'
import { Button } from '@/components/Button'
import { mockTableData } from '@/services/mockData'
import { Plus } from 'lucide-react'

export const UsersPage = () => {
  const tableColumns = ['Name', 'Email', 'Status', 'Joins', 'Revenue']

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />

      <div className="ml-64 flex-1">
        <Header />

        <main className="pt-20 p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Users</h1>
              <p className="text-muted-foreground mt-2">
                Manage all users and their access levels.
              </p>
            </div>
            <Button variant="default" className="gap-2">
              <Plus className="w-4 h-4" />
              Add User
            </Button>
          </div>

          <DataTable
            title="All Users"
            columns={tableColumns}
            data={mockTableData}
          />
        </main>
      </div>
    </div>
  )
}
