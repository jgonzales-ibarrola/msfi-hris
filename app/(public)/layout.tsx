import React, { ReactNode } from 'react'

export default function PublicLayout({children} : {
  children: ReactNode
}) {
  return (
    <>
      {/* Header */}
      <main>
        {children}
      </main>
      {/* Footer */}
    </>
  )
}
