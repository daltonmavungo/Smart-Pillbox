import { useState, useEffect } from "react"
import { getPacientes, getMedicamentos, getReceitasPaciente, criarReceita, desativarReceita } from "../../services/api"

const compartimentos = ["MANHA","ALMOCO","TARDE","NOITE"]
const compartimentoLabel = { MANHA:"Manha", ALMOCO:"Almoco", TARDE:"Tarde", NOITE:"Noite" }

const emptyItem = { medicamentoId:"", dosagem:"", compartimento:"MANHA", horario:"08:00", diasSemana:"", instrucoes:"" }
const emptyForm = { pacienteId:"", medicoId:"", dataInicio:"", dataFim:"", observacoes:"", itens:[{ ...emptyItem }] }

export default function Receitas() {
  const [pacientes, setPacientes] = useState([])
  const [medicamentos, setMedicamentos] = useState([])
  const [receitas, setReceitas] = useState([])
  const [pacienteId, setPacienteId] = useState("")
  const [loading, setLoading] = useState(false)
  const [modal, setModal] = useState(false)
  const [form, setForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    Promise.all([getPacientes(), getMedicamentos()])
      .then(([p, m]) => { setPacientes(p.data.dados || []); setMedicamentos(m.data.dados || []) })
  }, [])

  useEffect(() => {
    if (!pacienteId) return
    setLoading(true)
    getReceitasPaciente(pacienteId).then(r => setReceitas(r.data.dados || [])).finally(() => setLoading(false))
  }, [pacienteId])

  const addItem = () => setForm({ ...form, itens: [...form.itens, { ...emptyItem }] })
  const removeItem = (i) => setForm({ ...form, itens: form.itens.filter((_, idx) => idx !== i) })
  const updateItem = (i, field, value) => {
    const itens = [...form.itens]
    itens[i] = { ...itens[i], [field]: value }
    setForm({ ...form, itens })
  }

  const openNew = () => {
    setForm({ ...emptyForm, pacienteId: pacienteId, itens: [{ ...emptyItem }] })
    setModal(true)
  }

  const handleSave = async (e) => {
    e.preventDefault(); setSaving(true)
    try {
      await criarReceita(form)
      setModal(false)
      getReceitasPaciente(pacienteId).then(r => setReceitas(r.data.dados || []))
    } finally { setSaving(false) }
  }

  const handleDesativar = async (id) => {
    if (!confirm("Desactivar esta receita?")) return
    await desativarReceita(id)
    getReceitasPaciente(pacienteId).then(r => setReceitas(r.data.dados || []))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Receitas</h1>
          <p className="text-slate-500 mt-1">Prescrições médicas por paciente</p>
        </div>
        {pacienteId && <button onClick={openNew} className="btn-primary">+ Nova receita</button>}
      </div>

      {/* Selector paciente */}
      <div className="card p-4">
        <label className="label">Seleccionar paciente</label>
        <select className="input" value={pacienteId} onChange={e => setPacienteId(e.target.value)}>
          <option value="">-- Escolher paciente --</option>
          {pacientes.map(p => <option key={p.id} value={p.id}>{p.nome}</option>)}
        </select>
      </div>

      {/* Lista receitas */}
      {!pacienteId ? (
        <div className="card px-6 py-12 text-center text-slate-400">
          <p className="text-4xl mb-3">📋</p>
          <p>Seleccione um paciente para ver as receitas.</p>
        </div>
      ) : loading ? (
        <div className="card px-6 py-8 text-center text-slate-400">A carregar...</div>
      ) : receitas.length === 0 ? (
        <div className="card px-6 py-12 text-center text-slate-400">
          <p className="text-4xl mb-3">📋</p>
          <p>Nenhuma receita encontrada.</p>
          <button onClick={openNew} className="btn-primary mt-4 mx-auto">+ Criar receita</button>
        </div>
      ) : (
        <div className="space-y-4">
          {receitas.map(r => (
            <div key={r.id} className="card p-5">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-2xl">📋</span>
                    <h3 className="font-semibold text-slate-800">Receita #{r.id}</h3>
                    <span className={r.ativa ? "badge-success" : "badge-danger"}>{r.ativa ? "Activa" : "Inactiva"}</span>
                  </div>
                  <p className="text-sm text-slate-500 ml-9">
                    Início: {new Date(r.dataInicio).toLocaleDateString("pt-PT")}
                    {r.dataFim && ` — Fim: ${new Date(r.dataFim).toLocaleDateString("pt-PT")}`}
                  </p>
                  {r.observacoes && <p className="text-sm text-slate-400 ml-9 mt-1">{r.observacoes}</p>}
                </div>
                {r.ativa && (
                  <button onClick={() => handleDesativar(r.id)} className="text-xs text-red-600 hover:underline">Desactivar</button>
                )}
              </div>

              {/* Itens da receita */}
              {r.itens && r.itens.length > 0 && (
                <div className="mt-3 border-t border-slate-100 pt-3">
                  <p className="text-xs font-semibold text-slate-500 uppercase mb-2">Medicamentos prescritos</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {r.itens.map((item, i) => (
                      <div key={i} className="bg-slate-50 rounded-lg px-4 py-3 flex items-center gap-3">
                        <span className="text-xl">💊</span>
                        <div>
                          <p className="text-sm font-medium text-slate-800">{item.medicamento?.nome || "Medicamento"}</p>
                          <p className="text-xs text-slate-500">{item.dosagem} — {compartimentoLabel[item.compartimento]} às {item.horario}</p>
                          {item.instrucoes && <p className="text-xs text-slate-400 mt-0.5">{item.instrucoes}</p>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Modal nova receita */}
      {modal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-auto">
          <div className="card w-full max-w-2xl p-6 my-4">
            <div className="flex justify-between mb-6">
              <h2 className="font-semibold text-slate-800 text-lg">Nova Receita</h2>
              <button onClick={() => setModal(false)} className="text-slate-400 hover:text-slate-600 text-xl">✕</button>
            </div>
            <form onSubmit={handleSave} className="space-y-5">
              {/* Dados gerais */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="label">Data início *</label>
                  <input type="date" className="input" required value={form.dataInicio} onChange={e => setForm({...form, dataInicio:e.target.value})}/>
                </div>
                <div>
                  <label className="label">Data fim</label>
                  <input type="date" className="input" value={form.dataFim} onChange={e => setForm({...form, dataFim:e.target.value})}/>
                </div>
                <div className="col-span-2">
                  <label className="label">Observações</label>
                  <textarea className="input" rows={2} value={form.observacoes} onChange={e => setForm({...form, observacoes:e.target.value})}/>
                </div>
              </div>

              {/* Itens */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm font-semibold text-slate-700">Medicamentos prescritos</p>
                  <button type="button" onClick={addItem} className="text-sm text-blue-600 hover:underline">+ Adicionar medicamento</button>
                </div>
                <div className="space-y-3">
                  {form.itens.map((item, i) => (
                    <div key={i} className="bg-slate-50 rounded-lg p-4 space-y-3">
                      <div className="flex justify-between items-center">
                        <p className="text-sm font-medium text-slate-600">Medicamento {i+1}</p>
                        {form.itens.length > 1 && (
                          <button type="button" onClick={() => removeItem(i)} className="text-xs text-red-500 hover:underline">Remover</button>
                        )}
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="col-span-2">
                          <label className="label">Medicamento *</label>
                          <select className="input" required value={item.medicamentoId} onChange={e => updateItem(i, "medicamentoId", e.target.value)}>
                            <option value="">-- Seleccionar --</option>
                            {medicamentos.map(m => <option key={m.id} value={m.id}>{m.nome}</option>)}
                          </select>
                        </div>
                        <div>
                          <label className="label">Dosagem *</label>
                          <input className="input" required placeholder="ex: 500mg" value={item.dosagem} onChange={e => updateItem(i, "dosagem", e.target.value)}/>
                        </div>
                        <div>
                          <label className="label">Horário *</label>
                          <input type="time" className="input" required value={item.horario} onChange={e => updateItem(i, "horario", e.target.value)}/>
                        </div>
                        <div>
                          <label className="label">Compartimento *</label>
                          <select className="input" value={item.compartimento} onChange={e => updateItem(i, "compartimento", e.target.value)}>
                            {compartimentos.map(c => <option key={c} value={c}>{compartimentoLabel[c]}</option>)}
                          </select>
                        </div>
                        <div>
                          <label className="label">Instruções</label>
                          <input className="input" placeholder="ex: Tomar com água" value={item.instrucoes} onChange={e => updateItem(i, "instrucoes", e.target.value)}/>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={() => setModal(false)} className="btn-secondary">Cancelar</button>
                <button type="submit" className="btn-primary" disabled={saving}>{saving ? "A guardar..." : "Guardar receita"}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}