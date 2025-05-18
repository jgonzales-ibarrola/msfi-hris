import { notFound } from 'next/navigation';
import React from 'react'

async function UserUpdatePage({params} : {
  params: Promise<{userQrCode: string}>
}) {
  const {userQrCode} = await params;

  if (!userQrCode) {
    notFound();
  }

  return (
    <>
      <section>
        <h1 className='text-4xl font-bold'>User {userQrCode}</h1>
      </section>

      <section>
        {/* Form here */}
      </section>
    </>
  )
}

export default UserUpdatePage