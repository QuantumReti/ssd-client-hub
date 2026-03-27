import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import ClientDetail from './pages/ClientDetail'
import Layout from './components/Layout'

const USERS = ['josh@sunstatedigital.com.au','nick@sunstatedigital.com.au','matt@sunstatedigital.com.au','dereje@sunstatedigital.com.au']

export default function App() {
  const [user, setUser] = useState(() => localStorage.getItem('ssd_user'))

  const login = (email) => { localStorage.setItem('ssd_user', email); setUser(email) }
  const logout = () => { localStorage.removeItem('ssd_user'); setUser(null) }

  if (!user) return <Login onLogin={login} users={USERS} />

  return (
    <BrowserRouter>
      <Layout user={user} onLogout={logout}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/client/:id" element={<ClientDetail />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}
