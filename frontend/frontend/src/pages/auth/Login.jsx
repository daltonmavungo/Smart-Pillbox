import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"
import idosaImg from "../../assets/imagem/idosa.webp"
import { StethoIcon } from "../../components/logo/SmartPillboxLogo"

const SvgIcon = ({ path, size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round">
    <path d={path}/>
  </svg>
)

const ICONS = {
  mail:   "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
  lock:   "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 10-8 0v2",
  eye:    "M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z M12 14.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z",
  eyeOff: "M3 3l18 18M10.584 10.587a2 2 0 002.828 2.828M9.363 5.365A9.466 9.466 0 0112 5c4.478 0 8.268 2.943 9.542 7a9.93 9.93 0 01-1.563 2.96M6.226 6.228A9.928 9.928 0 002.458 12c1.274 4.057 5.065 7 9.542 7a9.466 9.466 0 003.939-.79",
  shield: "M12 3l8 4v5c0 5-3.5 8.5-8 9-4.5-.5-8-4-8-9V7l8-4z M9 12l2 2 4-4",
}

export default function Login() {
  const [form, setForm] = useState({ email: "", senha: "" })
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault(); setLoading(true); setError("")
    try { await login(form.email, form.senha); navigate("/dashboard") }
    catch { setError("Email ou senha incorrectos.") }
    finally { setLoading(false) }
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f1f5f9" }}>

      {/* Painel esquerdo - imagem */}
      <div className="login-image-panel" style={{
        flex: 1, position: "relative", display: "none",
        overflow: "hidden", minHeight: "100vh",
      }}>
        <img
          src={idosaImg}
          alt="Cuidado de saude"
          style={{
            position: "absolute", top: 0, left: 0,
            width: "100%", height: "100%",
            objectFit: "cover", objectPosition: "center top",
          }}
        />
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
          background: "linear-gradient(180deg, rgba(15,39,68,0.1) 0%, rgba(15,39,68,0.45) 50%, rgba(15,39,68,0.93) 100%)",
        }}/>
        <div style={{
          position: "relative", zIndex: 1,
          height: "100%", display: "flex", flexDirection: "column",
          justifyContent: "space-between", padding: 48,
        }}>
          <div>
            <StethoIcon size={40} color="#ffffff"/>
          </div>
          <div style={{ color: "#fff" }}>
            <h2 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.4, marginBottom: 12 }}>
              Cuidado e seguranca para quem mais importa
            </h2>
            <p style={{ fontSize: 14.5, color: "#cbd5e1", lineHeight: 1.65, maxWidth: 400 }}>
              O Smart Pillbox ajuda familiares e profissionais de saude a acompanhar
              a administracao de medicamentos com precisao e tranquilidade.
            </p>
          </div>
        </div>
      </div>

      {/* Painel direito - formulario */}
      <div style={{
        flex: 1, display: "flex", alignItems: "center",
        justifyContent: "center", padding: 24,
      }}>
        <div style={{ width: "100%", maxWidth: 400 }}>

          {/* Logo */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, marginBottom: 40 }}>
            <StethoIcon size={56} color="#2d2d2d"/>
            <div style={{ textAlign: "center" }}>
              <p style={{ color: "#3ba776", fontWeight: 700, fontSize: 18, margin: 0, letterSpacing: "-0.3px" }}>
                Smart Pillbox
              </p>
              <p style={{ color: "#94a3b8", fontSize: 12, margin: "3px 0 0" }}>
                Gestao de Medicamentos
              </p>
            </div>
          </div>

          <h1 style={{ fontSize: 23, fontWeight: 700, color: "#0f172a", marginBottom: 6 }}>
            Entrar na conta
          </h1>
          <p style={{ fontSize: 14, color: "#64748b", marginBottom: 28 }}>
            Introduza os seus dados de acesso para continuar.
          </p>

          {error && (
            <div style={{
              background: "#fef2f2", border: "1px solid #fecaca", color: "#b91c1c",
              padding: "10px 14px", borderRadius: 10, fontSize: 13.5, marginBottom: 18,
            }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 18 }}>

            <div>
              <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#475569", marginBottom: 6 }}>
                Email
              </label>
              <div style={{ position: "relative" }}>
                <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#94a3b8", display: "flex" }}>
                  <SvgIcon path={ICONS.mail} size={17}/>
                </span>
                <input
                  type="email" required placeholder="seu@email.com"
                  value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                  style={{ width: "100%", padding: "11px 14px 11px 38px", border: "1px solid #e2e8f0", borderRadius: 10, fontSize: 14, outline: "none", background: "#fff" }}
                  onFocus={e => { e.target.style.borderColor = "#3ba776"; e.target.style.boxShadow = "0 0 0 3px rgba(59,167,118,0.12)" }}
                  onBlur={e => { e.target.style.borderColor = "#e2e8f0"; e.target.style.boxShadow = "none" }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#475569", marginBottom: 6 }}>
                Senha
              </label>
              <div style={{ position: "relative" }}>
                <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#94a3b8", display: "flex" }}>
                  <SvgIcon path={ICONS.lock} size={17}/>
                </span>
                <input
                  type={showPass ? "text" : "password"} required placeholder="••••••••"
                  value={form.senha} onChange={e => setForm({ ...form, senha: e.target.value })}
                  style={{ width: "100%", padding: "11px 40px 11px 38px", border: "1px solid #e2e8f0", borderRadius: 10, fontSize: 14, outline: "none", background: "#fff" }}
                  onFocus={e => { e.target.style.borderColor = "#3ba776"; e.target.style.boxShadow = "0 0 0 3px rgba(59,167,118,0.12)" }}
                  onBlur={e => { e.target.style.borderColor = "#e2e8f0"; e.target.style.boxShadow = "none" }}
                />
                <button type="button" onClick={() => setShowPass(!showPass)}
                  style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#94a3b8", display: "flex", padding: 4 }}>
                  <SvgIcon path={showPass ? ICONS.eyeOff : ICONS.eye} size={17}/>
                </button>
              </div>
            </div>

            <button
              type="submit" disabled={loading}
              style={{
                width: "100%", padding: "12px 0", marginTop: 4,
                background: loading ? "#7ec9a8" : "linear-gradient(135deg,#3ba776,#2d9268)",
                color: "#fff", fontWeight: 700, fontSize: 15,
                border: "none", borderRadius: 10, cursor: loading ? "default" : "pointer",
                boxShadow: "0 4px 14px rgba(59,167,118,0.28)",
                transition: "transform 0.1s",
              }}
              onMouseEnter={e => !loading && (e.currentTarget.style.background = "linear-gradient(135deg,#34a06e,#268055)")}
              onMouseLeave={e => !loading && (e.currentTarget.style.background = "linear-gradient(135deg,#3ba776,#2d9268)")}
              onMouseDown={e => !loading && (e.currentTarget.style.transform = "scale(0.98)")}
              onMouseUp={e => (e.currentTarget.style.transform = "scale(1)")}
            >
              {loading ? "A entrar..." : "Entrar"}
            </button>
          </form>

          <div style={{
            marginTop: 28, padding: "14px 16px",
            background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 10,
            display: "flex", alignItems: "flex-start", gap: 10,
          }}>
            <span style={{ color: "#3ba776", flexShrink: 0, marginTop: 1 }}>
              <SvgIcon path={ICONS.shield} size={16}/>
            </span>
            <p style={{ fontSize: 12, color: "#64748b", lineHeight: 1.55, margin: 0 }}>
              O acesso a este sistema e restrito a profissionais de saude e familiares autorizados.
              Todos os dados sao tratados com confidencialidade.
            </p>
          </div>

        </div>
      </div>

      <style>{`
        @media (min-width: 1024px) {
          .login-image-panel { display: flex !important; }
        }
      `}</style>
    </div>
  )
}