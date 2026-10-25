// Escudo propio dibujado con SVG.
// Props: team (forma, colores y siglas) y size (ancho en px).
function Crest({ team, size = 48 }) {
  if (team.logo) {
    return (
      <img
        src={team.logo}
        alt={`Escudo de ${team.name}`}
        width={size}
        height={size}
        className="crest"
        style={{ objectFit: "contain" }}
      />
    );
  }

  const path = SHAPES[team.shape];
  const clipId = `clip-${team.id}`;
  const [main, accent] = team.colors;

  return (
    <svg

      viewBox="0 0 100 110"
      width={size}
      height={size * 1.1}
      role="img"
      aria-label={`Escudo de ${team.name}`}
      className="crest"
    >
      <defs>
        <clipPath id={clipId}>
          <path d={path} />
        </clipPath>
      </defs>
      <path d={path} fill={main} />
      <g clipPath={`url(#${clipId})`}>
        <rect x="-20" y="46" width="140" height="26" fill={accent} transform="rotate(-18 50 55)" />
      </g>
      <path d={path} fill="none" stroke="#f3ead9" strokeWidth="4" />
      <text
        x="50"
        y="66"
        textAnchor="middle"
        fontFamily="Georgia, serif"
        fontWeight="700"
        fontSize="24"
        fill="#fff"
        stroke="#1e1a17"
        strokeWidth="4"
        paintOrder="stroke"
      >
        {team.short}
      </text>
    </svg>
  );
}

export default Crest;
