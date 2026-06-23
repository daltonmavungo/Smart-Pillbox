import { useState, useEffect } from "react"
import { getPacientes, criarPaciente, atualizarPaciente, desativarPaciente } from "../../services/api"

const empty = { nome:"", telefone:"", emailFamiliar:"", contatoEmergencia:"", telefoneEmergencia:"", endereco:"" }

export default function Pacientes() {
  const [pacientes, setPacientes] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [modal, setModal] = useState(false)
  const [form, setForm] = useState(empty)
  const [editId, setEditId] = useState(null)
  const [saving, setSaving] = useState(false)

  const load = () => getPacientes().then(r => setPacientes(r.data.dados || [])).finally(() => setLoading(false))
  useEffect(() => { load() }, [])

  const openNew = () => { setForm(empty); setEditId(null); setModal(true) }
  const openEdit = (p) => { setForm({ nome:p.nome, telefone:p.telefone||"", emailFamiliar:p.emailFamiliar||"", contatoEmergencia:p.contatoEmergencia||"", telefoneEmergencia:p.telefoneEmergencia||"", endereco:p.endereco||"" }); setEditId(p.id); setModal(true) }

  const handleSave = async (e) => {
    e.preventDefault(); setSaving(true)
    try { if (editId) await atualizarPaciente(editId, form); else await criarPaciente(form); setModal(false); load() }
    finally { setSaving(false) }
  }

  const handleDelete = async (id) => {
    if (!confirm("Desactivar este paciente?")) return
    await desativarPaciente(id); load()
  }

  const filtered = pacientes.filter(p => p.nome.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Pacientes</h1>
          <p className="text-slate-500 mt-1">{pacientes.length} pacientes registados</p>
        </div>
        <button onClick={openNew} className="btn-primary">+ Novo paciente</button>
      </div>
      <input className="input" placeholder="Pesquisar..." value={search} onChange={e => setSearch(e.target.value)}/>
      <div className="card overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr>{["Paciente","Telefone","Email familiar","Estado","Acções"].map(h => <th key={h} className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase">{h}</th>)}</tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {loading ? <tr><td colSpan={5} className="px-6 py-8 text-center text-slate-400">A carregar...</td></tr>
            : filtered.length === 0 ? <tr><td colSpan={5} className="px-6 py-8 text-center text-slate-400">Nenhum paciente encontrado.</td></tr>
            : filtered.map(p => (
              <tr key={p.id} className="hover:bg-slate-50">
                <td className="px-6 py-4"><div className="flex items-center gap-3"><div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 font-bold text-sm">{p.nome[0]}</div><span className="font-medium text-sm">{p.nome}</span></div></td>
                <td className="px-6 py-4 text-sm text-slate-600">{p.telefone||"—"}</td>
                <td className="px-6 py-4 text-sm text-slate-600">{p.emailFamiliar||"—"}</td>
                <td className="px-6 py-4"><span className={p.ativo ? "badge-success" : "badge-danger"}>{p.ativo ? "Activo" : "Inactivo"}</span></td>
                <td className="px-6 py-4 flex gap-2">
                  <button onClick={() => openEdit(p)} className="text-xs text-blue-600 hover:underline">Editar</button>
                  <button onClick={() => handleDelete(p.id)} className="text-xs text-red-600 hover:underline">Desact.</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {modal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="card w-full max-w-lg p-6">
            <div className="flex justify-between mb-6">
              <h2 className="font-semibold text-slate-800">{editId ? "Editar paciente" : "Novo paciente"}</h2>
              <button onClick={() => setModal(false)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>
            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2"><label className="label">Nome *</label><input className="input" required value={form.nome} onChange={e => setForm({...form, nome:e.target.value})}/></div>
                <div><label className="label">Telefone</label><input className="input" value={form.telefone} onChange={e => setForm({...form, telefone:e.target.value})}/></div>
                <div><label className="label">Email familiar</label><input className="input" type="email" value={form.emailFamiliar} onChange={e => setForm({...form, emailFamiliar:e.target.value})}/></div>
                <div><label className="label">Contacto emergência</label><input className="input" value={form.contatoEmergencia} onChange={e => setForm({...form, contatoEmergencia:e.target.value})}/></div>
                <div><label className="label">Tel. emergência</label><input className="input" value={form.telefoneEmergencia} onChange={e => setForm({...form, telefoneEmergencia:e.target.value})}/></div>
                <div className="col-span-2"><label className="label">Endereço</label><input className="input" value={form.endereco} onChange={e => setForm({...form, endereco:e.target.value})}/></div>
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={() => setModal(false)} className="btn-secondary">Cancelar</button>
                <button type="submit" className="btn-primary" disabled={saving}>{saving ? "A guardar..." : "Guardar"}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}