import axios from "axios"

const api = axios.create({ baseURL: "http://localhost:8080/api", headers: { "Content-Type": "application/json" } })

api.interceptors.request.use(config => {
  const token = localStorage.getItem("token")
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

api.interceptors.response.use(res => res, err => {
  if (err.response?.status === 401) { localStorage.clear(); window.location.href = "/login" }
  return Promise.reject(err)
})

export default api
export const getPacientes = () => api.get("/pacientes")
export const criarPaciente = (data) => api.post("/pacientes", data)
export const atualizarPaciente = (id, data) => api.put(`/pacientes/${id}`, data)
export const desativarPaciente = (id) => api.delete(`/pacientes/${id}`)
export const getMedicamentos = () => api.get("/medicamentos")
export const criarMedicamento = (data) => api.post("/medicamentos", data)
export const atualizarMedicamento = (id, data) => api.put(`/medicamentos/${id}`, data)
export const deletarMedicamento = (id) => api.delete(`/medicamentos/${id}`)
export const getReceitasPaciente = (id) => api.get(`/receitas/paciente/${id}`)
export const criarReceita = (data) => api.post("/receitas", data)
export const desativarReceita = (id) => api.delete(`/receitas/${id}`)
export const getEventosPaciente = (id) => api.get(`/eventos/paciente/${id}`)