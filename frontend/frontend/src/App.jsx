import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { AuthProvider, useAuth } from "./context/AuthContext"
import Layout from "./components/layout/Layout"
import Login from "./pages/auth/Login"
import Dashboard from "./pages/dashboard/Dashboard"
import Pacientes from "./pages/pacientes/Pacientes"
import Medicamentos from "./pages/medicamentos/Medicamentos"
import Receitas from "./pages/receitas/Receitas"
import Eventos from "./pages/eventos/Eventos"

function PrivateRoute({ children }) {
  const { user, loading } = useAuth()
  if (loading) return <div className="min-h-screen flex items-center justify-center text-slate-400">A carregar...</div>
  return user ? <Layout>{children}</Layout> : <Navigate to="/login"/>
}

function PublicRoute({ children }) {
  const { user, loading } = useAuth()
  if (loading) return null
  return user ? <Navigate to="/dashboard"/> : children
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login"        element={<PublicRoute><Login/></PublicRoute>}/>
          <Route path="/dashboard"    element={<PrivateRoute><Dashboard/></PrivateRoute>}/>
          <Route path="/pacientes"    element={<PrivateRoute><Pacientes/></PrivateRoute>}/>
          <Route path="/medicamentos" element={<PrivateRoute><Medicamentos/></PrivateRoute>}/>
          <Route path="/receitas"     element={<PrivateRoute><Receitas/></PrivateRoute>}/>
          <Route path="/eventos"      element={<PrivateRoute><Eventos/></PrivateRoute>}/>
          <Route path="*"             element={<Navigate to="/dashboard"/>}/>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}