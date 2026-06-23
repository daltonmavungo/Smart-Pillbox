export default function SmartPillboxLogo({ size = 48, showText = true, textColor = "#3ba776", iconColor = "#2d2d2d", subText = "" }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
      <StethoIcon size={size} color={iconColor}/>
      {showText && (
        <div style={{ textAlign: "center" }}>
          <p style={{ color: textColor, fontWeight: 700, fontSize: size * 0.28, lineHeight: 1.1, letterSpacing: "-0.3px", margin: 0 }}>
            Smart Pillbox
          </p>
          {subText && (
            <p style={{ color: "#94a3b8", fontWeight: 400, fontSize: size * 0.14, marginTop: 3, margin: 0 }}>
              {subText}
            </p>
          )}
        </div>
      )}
    </div>
  )
}

export function StethoIcon({ size = 24, color = "#2d2d2d" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 110 110" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g stroke={color} strokeWidth={5.5} strokeLinecap="round" strokeLinejoin="round" fill="none">
        <line x1="26" y1="6" x2="26" y2="22"/>
        <line x1="44" y1="6" x2="44" y2="18"/>
        <path d="M26 22 C26 35, 44 35, 44 18"/>
        <path d="M35 28 L35 50 C35 64, 52 67, 54 52 C56 38, 70 40, 70 54 L70 67"/>
        <circle cx="70" cy="78" r="11"/>
      </g>
      <circle cx="70" cy="78" r="4" fill={color}/>
      <circle cx="89" cy="92" r="8" fill={color}/>
    </svg>
  )
}