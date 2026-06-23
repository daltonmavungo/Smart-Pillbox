import { useState } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"
import { StethoIcon } from "../logo/SmartPillboxLogo"

const SvgIcon = ({ path, size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round">
    <path d={path}/>
  </svg>
)

const ICONS = {
  dashboard:    "M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z M9 21V12h6v9",
  pacientes:    "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z",
  medicamentos: "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z",
  receitas:     "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4",
  eventos:      "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
  logout:       "M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4m7 14l5-5-5-5m5 5H9",
  menu:         "M4 6h16M4 12h16M4 18h7",
  bell:         "M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0",
}

const NAV = [
  { to: "/dashboard",    label: "Dashboard",    icon: ICONS.dashboard    },
  { to: "/pacientes",    label: "Pacientes",    icon: ICONS.pacientes    },
  { to: "/medicamentos", label: "Medicamentos", icon: ICONS.medicamentos },
  { to: "/receitas",     label: "Receitas",     icon: ICONS.receitas     },
  { to: "/eventos",      label: "Eventos",      icon: ICONS.eventos      },
]

const ROLE = { ADMIN:"Administrador", MEDICO:"Medico", FAMILIAR:"Familiar", PACIENTE:"Paciente" }

function Avatar({ name, size = 32 }) {
  const initials = name ? name.split(" ").map(n => n[0]).slice(0,2).join("").toUpperCase() : "U"
  return (
    <div style={{
      width: size, height: size, fontSize: size * 0.38,
      borderRadius: 8, background: "#3ba776",
      display: "flex", alignItems: "center", justifyContent: "center",
      color: "#fff", fontWeight: 700, flexShrink: 0, userSelect: "none",
    }}>
      {initials}
    </div>
  )
}

export default function Layout({ children }) {
  const [collapsed, setCollapsed] = useState(false)
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden", background: "#f1f5f9" }}>

      <aside style={{
        width: collapsed ? 68 : 232,
        background: "#0f2744",
        display: "flex", flexDirection: "column", flexShrink: 0,
        transition: "width 0.25s ease",
      }}>

        <div style={{
          display: "flex", alignItems: "center", gap: 10,
          padding: collapsed ? "18px 0" : "18px 16px",
          justifyContent: collapsed ? "center" : "flex-start",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
        }}>
          <StethoIcon size={30} color="#3ba776"/>
          {!collapsed && (
            <div>
              <p style={{ color: "#fff", fontWeight: 700, fontSize: 14, lineHeight: 1.2 }}>Smart Pillbox</p>
              <p style={{ color: "#5a8ab0", fontSize: 10.5 }}>Gestao de Medicamentos</p>
            </div>
          )}
        </div>

        {!collapsed && (
          <p style={{ color: "#3a6a8a", fontSize: 9.5, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", padding: "18px 20px 8px" }}>
            Menu Principal
          </p>
        )}

        <nav style={{ flex: 1, padding: "4px 8px", overflowY: "auto" }}>
          {NAV.map(({ to, label, icon }) => (
            <NavLink key={to} to={to} style={{ textDecoration: "none", display: "block", marginBottom: 2 }}>
              {({ isActive }) => (
                <div style={{
                  display: "flex", alignItems: "center", gap: 10,
                  padding: collapsed ? "10px 0" : "9px 12px",
                  justifyContent: collapsed ? "center" : "flex-start",
                  borderRadius: 8,
                  background: isActive ? "linear-gradient(90deg,#2d9268,#3ba776)" : "transparent",
                  color: isActive ? "#fff" : "#7aa8c8",
                  cursor: "pointer", transition: "all 0.15s",
                }}
                onMouseEnter={e => { if (!isActive) { e.currentTarget.style.background = "rgba(255,255,255,0.07)"; e.currentTarget.style.color = "#fff" }}}
                onMouseLeave={e => { if (!isActive) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#7aa8c8" }}}>
                  <span style={{ flexShrink: 0, display: "flex" }}><SvgIcon path={icon} size={18}/></span>
                  {!collapsed && <span style={{ fontSize: 13.5, fontWeight: 500 }}>{label}</span>}
                  {!collapsed && isActive && <span style={{ marginLeft: "auto", width: 6, height: 6, borderRadius: "50%", background: "rgba(255,255,255,0.8)" }}/>}
                </div>
              )}
            </NavLink>
          ))}
        </nav>

        <div style={{ height: 1, background: "rgba(255,255,255,0.07)", margin: "0 8px" }}/>

        <div style={{ padding: 8 }}>
          {!collapsed ? (
            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderRadius: 8 }}>
              <Avatar name={user?.nome} size={34}/>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ color: "#fff", fontSize: 12.5, fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{user?.nome}</p>
                <p style={{ color: "#5a8ab0", fontSize: 10.5 }}>{ROLE[user?.role]}</p>
              </div>
              <button onClick={() => { logout(); navigate("/login") }}
                style={{ color: "#5a8ab0", background: "none", border: "none", cursor: "pointer", padding: 4, borderRadius: 6, display: "flex" }}
                onMouseEnter={e => e.currentTarget.style.color = "#fff"}
                onMouseLeave={e => e.currentTarget.style.color = "#5a8ab0"}>
                <SvgIcon path={ICONS.logout} size={16}/>
              </button>
            </div>
          ) : (
            <button onClick={() => { logout(); navigate("/login") }}
              style={{ width: "100%", display: "flex", justifyContent: "center", color: "#5a8ab0", background: "none", border: "none", cursor: "pointer", padding: "10px 0", borderRadius: 8 }}
              onMouseEnter={e => e.currentTarget.style.color = "#fff"}
              onMouseLeave={e => e.currentTarget.style.color = "#5a8ab0"}>
              <SvgIcon path={ICONS.logout} size={18}/>
            </button>
          )}
        </div>
      </aside>

      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <header style={{
          background: "#fff", borderBottom: "1px solid #e2e8f0",
          height: 62, display: "flex", alignItems: "center",
          justifyContent: "space-between", padding: "0 24px", flexShrink: 0,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <button onClick={() => setCollapsed(!collapsed)}
              style={{ width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 8, border: "none", background: "none", cursor: "pointer", color: "#94a3b8" }}
              onMouseEnter={e => { e.currentTarget.style.background = "#f1f5f9"; e.currentTarget.style.color = "#475569" }}
              onMouseLeave={e => { e.currentTarget.style.background = "none"; e.currentTarget.style.color = "#94a3b8" }}>
              <SvgIcon path={ICONS.menu} size={20}/>
            </button>
            <div style={{ width: 1, height: 20, background: "#e2e8f0" }}/>
            <p style={{ fontSize: 13, fontWeight: 600, color: "#64748b" }}>Sistema de Gestao de Medicamentos</p>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <button style={{ position: "relative", width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 8, border: "none", background: "none", cursor: "pointer", color: "#94a3b8" }}
              onMouseEnter={e => { e.currentTarget.style.background = "#f1f5f9"; e.currentTarget.style.color = "#475569" }}
              onMouseLeave={e => { e.currentTarget.style.background = "none"; e.currentTarget.style.color = "#94a3b8" }}>
              <SvgIcon path={ICONS.bell} size={19}/>
              <span style={{ position: "absolute", top: 8, right: 8, width: 7, height: 7, background: "#3ba776", borderRadius: "50%", border: "2px solid #fff" }}/>
            </button>
            <div style={{ width: 1, height: 20, background: "#e2e8f0", margin: "0 4px" }}/>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <Avatar name={user?.nome} size={34}/>
              <div>
                <p style={{ fontSize: 13, fontWeight: 600, color: "#1e293b", lineHeight: 1.2 }}>{user?.nome}</p>
                <p style={{ fontSize: 11, color: "#94a3b8" }}>{ROLE[user?.role]}</p>
              </div>
            </div>
          </div>
        </header>

        <main style={{ flex: 1, overflow: "auto", padding: 24 }}>
          {children}
        </main>
      </div>
    </div>
  )
}