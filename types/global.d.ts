import { Permissions, Role } from "@prisma/client"

export {}

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      qrCode: string,
      roles: string[],
    }
  }
}