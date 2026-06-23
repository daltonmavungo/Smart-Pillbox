import { useState, useEffect } from "react"
import { getPacientes, getEventosPaciente } from "../../services/api"

const statusConfig = {
  CONFIRMADO: { label:"Confirmado", cls:"badge-success" },
  ESQUECIDO:  { label:"Esquecido",  cls:"badge-danger"  },
  PENDENTE:   { label:"Pendente",   cls:"badge-warning" },
  ATRASADO:   { label:"Atrasado",   cls:"badge-danger"  },
}
const compartimentoLabel = { MANHA:"Manhã", ALMOCO:"Almoço", TARDE:"Tarde", NOITE:"Noite" }

export default function Eventos() {
  const [pacientes, setPacientes] = useState([])
  const [eventos, setEventos] = useState([])
  const [pacienteId, setPacienteId] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => { getPacientes().then(r => setPacientes(r.data.dados || [])) }, [])
  useEffect(() => {
    if (!pacienteId) return
    setLoading(true)
    getEventosPaciente(pacienteId).then(r => setEventos(r.data.dados || [])).finally(() => setLoading(false))
  }, [pacienteId])

  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold text-slate-800">Eventos</h1><p className="text-slate-500 mt-1">Histórico de confirmações e esquecimentos</p></div>
      <div className="card p-4">
        <label className="label">Seleccionar paciente</label>
        <select className="input" value={pacienteId} onChange={e => setPacienteId(e.target.value)}>
          <option value="">-- Escolher --</option>
          {pacientes.map(p => <option key={p.id} value={p.id}>{p.nome}</option>)}
        </select>
      </div>
      <div className="card overflow-hidden">
        {!pacienteId ? <div className="px-6 py-12 text-center text-slate-400">Seleccione um paciente.</div>
        : loading ? <div className="px-6 py-8 text-center text-slate-400">A carregar...</div>
        : eventos.length === 0 ? <div className="px-6 py-12 text-center text-slate-400">Nenhum evento registado.</div>
        : <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>{["Data/Hora","Compartimento","Estado","Confirmado em"].map(h => <th key={h} className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase">{h}</th>)}</tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {eventos.map(e => {
                const cfg = statusConfig[e.status] || statusConfig.PENDENTE
                return (
                  <tr key={e.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4 text-sm">{new Date(e.horarioPrevisto).toLocaleString("pt-PT")}</td>
                    <td className="px-6 py-4 text-sm font-medium">{compartimentoLabel[e.compartimento] || e.compartimento}</td>
                    <td className="px-6 py-4"><span className={cfg.cls}>{cfg.label}</span></td>
                    <td className="px-6 py-4 text-sm text-slate-500">{e.horarioConfirmado ? new Date(e.horarioConfirmado).toLocaleString("pt-PT") : "—"}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>}
      </div>
    </div>
  )
}