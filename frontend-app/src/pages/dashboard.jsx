import React, { useEffect } from "react"
import { useSelector } from "react-redux"
import AppLayout from "../layouts/AppLayout"

export default function Dashboard() {
  const user = useSelector((state) => state.auth.user)

  useEffect(() => {
    document.title = "Dashboard"
  }, [])

  return (
    <AppLayout>
      <h1 className="text-2xl font-bold mb-2">Dashboard</h1>

      {user && (
        <p>
          Selamat datang di Dashboard {user.Status == 1 ? "Admin" : "User"}.
          Silahkan pilih menu di samping untuk melanjutkan.
        </p>
      )}
    </AppLayout>
  )
}
