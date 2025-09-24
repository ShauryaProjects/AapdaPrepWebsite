"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { onAuthStateChanged, type User } from "firebase/auth"
import { auth } from "@/lib/firebase"

type AuthContextValue = {
  user: User | null
  loading: boolean
  setUser: (user: User | null) => void
}

const AuthContext = createContext<AuthContextValue>({ user: null, loading: true, setUser: () => {} })

export function AuthProvider({ children }: { children: React.ReactNode }) {
  // Initialize with the currently cached Firebase user to avoid UI flicker
  const [user, setUser] = useState<User | null>(auth.currentUser ?? null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser)
      setLoading(false)
    })
    return () => unsub()
  }, [])

  return <AuthContext.Provider value={{ user, loading, setUser }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  return useContext(AuthContext)
}


