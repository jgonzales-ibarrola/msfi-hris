import { SignOut } from '@/components/auth/sign-out'
import { auth } from '@clerk/nextjs/server'
import React from 'react'

export default async function LobbyPage() {
  const {userId} = await auth();

  return (
    <>
      <section>
        <h1 className='text-4xl font-bold'>Logs</h1>
        {userId && <SignOut />}
      </section>
    </>
  )
}
