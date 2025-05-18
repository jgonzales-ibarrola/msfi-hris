'use client';

import { useQuery } from "@tanstack/react-query";

const HOST_URL = process.env.NEXT_URL

export const useClerkUserSession = () => {

  return useQuery({
    queryKey: ['session'],
    queryFn: async () => {
      const res = await fetch(`${HOST_URL}/session`)

      if (!res.ok) {
        const error = await res.json();

        console.log("Failed to get the session.")
        throw new Error("Failed to get the session.")
      }

      const data = await res.json();

      return data;
    }
  })
}