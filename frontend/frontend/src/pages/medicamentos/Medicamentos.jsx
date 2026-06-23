import { useState, useEffect } from "react"
import { getMedicamentos, criarMedicamento, atualizarMedicamento, deletarMedicamento } from "../../services/api"

const empty = { nome:"", principioAtivo:"", fabricante:"", descricao:"" }

export default function Medicamentos() {
  const [medicamentos, setMedicamentos] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [modal, setModal] = useState(false)
  const [form, setForm] = useState(empty)
  const [editId, setEditId] = useState(null)
  const [saving, setSaving] = useState(false)

  const load = () => getMedicamentos().then(r => setMedicamentos(r.data.dados || [])).finally(() => setLoading(false))
  useEffect(() => { load() }, [])

  const openNew = () => { setForm(empty); setEditId(null); setModal(true) }
  const openEdit = (m) => { setForm({ nome:m.nome, principioAtivo:m.principioAtivo||"", fabricante:m.fabricante||"", descricao:m.descricao||"" }); setEditId(m.id); setModal(true) }

  const handleSave = async (e) => {
    e.preventDefault(); setSaving(true)
    try { if (editId) await atualizarMedicamento(editId, form); else await criarMedicamento(form); setModal(false); load() }
    finally { setSaving(false) }
  }

  const handleDelete = async (id) => {
    if (!confirm("Eliminar medicamento?")) return
    await deletarMedicamento(id); load()
  }

  const filtered = medicamentos.filter(m => m.nome.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-bold text-slate-800">Medicamentos</h1><p className="text-slate-500 mt-1">{medicamentos.length} registados</p></div>
        <button onClick={openNew} className="btn-primary">+ Novo medicamento</button>
      </div>
      <input className="input" placeholder="Pesquisar..." value={search} onChange={e => setSearch(e.target.value)}/>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? <p className="text-slate-400 col-span-3 text-center py-8">A carregar...</p>
        : filtered.length === 0 ? <div className="col-span-3 text-center py-12 text-slate-400"><p className="text-4xl mb-3">💊</p><p>Nenhum medicamento encontrado.</p><button onClick={openNew} className="btn-primary mt-4 mx-auto">+ Adicionar</button></div>
        : filtered.map(m => (
          <div key={m.id} className="card p-5 hover:shadow-md transition-shadow">
            <div className="flex justify-between mb-3">
              <span className="text-2xl">💊</span>
              <div className="flex gap-1">
                <button onClick={() => openEdit(m)} className="text-xs text-blue-600 hover:underline px-2">Editar</button>
                <button onClick={() => handleDelete(m.id)} className="text-xs text-red-600 hover:underline px-2">Eliminar</button>
              </div>
            </div>
            <h3 className="font-semibold text-slate-800">{m.nome}</h3>
            {m.principioAtivo && <p className="text-sm text-slate-500 mt-1">{m.principioAtivo}</p>}
            {m.fabricante && <p className="text-xs text-slate-400 mt-2">Fabricante: {m.fabricante}</p>}
          </div>
        ))}
      </div>
      {modal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="card w-full max-w-md p-6">
            <div className="flex justify-between mb-6">
              <h2 className="font-semibold">{editId ? "Editar" : "Novo medicamento"}</h2>
              <button onClick={() => setModal(false)}>✕</button>
            </div>
            <form onSubmit={handleSave} className="space-y-4">
              <div><label className="label">Nome *</label><input className="input" required value={form.nome} onChange={e => setForm({...form, nome:e.target.value})}/></div>
              <div><label className="label">Princípio activo</label><input className="input" value={form.principioAtivo} onChange={e => setForm({...form, principioAtivo:e.target.value})}/></div>
              <div><label className="label">Fabricante</label><input className="input" value={form.fabricante} onChange={e => setForm({...form, fabricante:e.target.value})}/></div>
              <div><label className="label">Descrição</label><textarea className="input" rows={3} value={form.descricao} onChange={e => setForm({...form, descricao:e.target.value})}/></div>
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