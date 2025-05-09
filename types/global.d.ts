import { Role } from "@prisma/client"

export {}

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      role: Role,
      permissions: string[]
    }
  }
}