import { useState, useEffect } from "react"
import { getPacientes, getMedicamentos } from "../../services/api"
import { useAuth } from "../../context/AuthContext"

export default function Dashboard() {
  const { user } = useAuth()
  const [pacientes, setPacientes] = useState([])
  const [medicamentos, setMedicamentos] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([getPacientes(), getMedicamentos()])
      .then(([p, m]) => { setPacientes(p.data.dados || []); setMedicamentos(m.data.dados || []) })
      .finally(() => setLoading(false))
  }, [])

  const stats = [
    { label: "Pacientes activos", value: loading ? "..." : pacientes.filter(p => p.ativo).length, color: "bg-blue-50 text-blue-600" },
    { label: "Medicamentos",      value: loading ? "..." : medicamentos.length,                    color: "bg-green-50 text-green-600" },
    { label: "Tomados hoje",      value: "—",                                                      color: "bg-green-50 text-green-600" },
    { label: "Esquecidos hoje",   value: "—",                                                      color: "bg-yellow-50 text-yellow-600" },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Bom dia, {user?.nome?.split(" ")[0]}! 👋</h1>
        <p className="text-slate-500 mt-1">Resumo do sistema.</p>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <div key={i} className="card p-6">
            <p className="text-sm text-slate-500">{s.label}</p>
            <p className="text-3xl font-bold text-slate-800 mt-1">{s.value}</p>
          </div>
        ))}
      </div>
      <div className="card">
        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
          <h2 className="font-semibold text-slate-800">Pacientes recentes</h2>
          <a href="/pacientes" className="text-sm text-blue-600 hover:underline">Ver todos</a>
        </div>
        <div className="divide-y divide-slate-100">
          {loading ? <div className="px-6 py-8 text-center text-slate-400">A carregar...</div>
          : pacientes.length === 0 ? <div className="px-6 py-8 text-center text-slate-400">Nenhum paciente cadastrado.</div>
          : pacientes.slice(0,5).map(p => (
            <div key={p.id} className="px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 font-bold">{p.nome[0]}</div>
                <div>
                  <p className="font-medium text-sm text-slate-800">{p.nome}</p>
                  <p className="text-xs text-slate-400">{p.emailFamiliar || "Sem email familiar"}</p>
                </div>
              </div>
              <span className={p.ativo ? "badge-success" : "badge-danger"}>{p.ativo ? "Activo" : "Inactivo"}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}