'use client'

import { useClerk } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'

export const SignOut = () => {
  const { signOut } = useClerk()

  return (
    // Clicking this button signs out a user
    // and redirects them to the home page "/".
    <Button onClick={() => signOut({ redirectUrl: '/' })}>Sign out</Button>
  )
}