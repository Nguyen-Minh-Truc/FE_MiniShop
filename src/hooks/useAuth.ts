'use client'

import { useCallback } from 'react'
import { mockUser } from '@/services/mockData'
import { User } from '@/types'

export const useAuth = () => {
  const getUser = useCallback((): User => {
    return mockUser
  }, [])

  const logout = useCallback(() => {
    // Mock logout logic
    console.log('User logged out')
  }, [])

  const updateProfile = useCallback((data: Partial<User>) => {
    // Mock update logic
    console.log('Profile updated:', data)
  }, [])

  return {
    user: getUser(),
    logout,
    updateProfile,
  }
}
