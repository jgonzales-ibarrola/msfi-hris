"use client"

import { ColumnDef } from "@tanstack/react-table"

export type User = {
  id: string,
  qrCode: string,
  firstName: string,
  lastname: string,
  email: string ,
  role: string,
  status: string,
  agency: string,
  department: string,
  dateHired: string,
}

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "qrCode",
    header: "QR Code",
  },
  {
    accessorKey: "firstName",
    header: "First Name",
  },
  {
    accessorKey: "lastname",
    header: "Last Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "agency",
    header: "Agency",
  },
  {
    accessorKey: "department",
    header: "Department",
  },
  {
    accessorKey: "dateHired",
    header: "Date Hired",
  },
]
