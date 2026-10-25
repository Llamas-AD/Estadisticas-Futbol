import Crest from "./Crest";

// Props: rows (filas ya calculadas y ordenadas) y hasMatches (boolean)
function StandingsTable({ rows, hasMatches }) {
  return (
    <section className="panel">
      <h2 className="section-title">Tabla de posiciones</h2>

      {!hasMatches && (
        <p className="notice">Aún no hay partidos registrados, así que todos los equipos están en cero.</p>
      )}

      <div className="table-wrap">
        <table className="standings">
          <thead>
            <tr>
              <th>#</th>
              <th className="left">Equipo</th>
              <th title="Partidos jugados">PJ</th>
              <th title="Ganados">G</th>
              <th title="Empatados">E</th>
              <th title="Perdidos">P</th>
              <th title="Goles a favor">GF</th>
              <th title="Goles en contra">GC</th>
              <th title="Diferencia de goles">DG</th>
              <th title="Puntos">Pts</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={row.team.id} className={index === 0 && hasMatches ? "leader" : ""}>
                <td>{index + 1}</td>
                <td className="left">
                  <span className="team-cell">
                    <Crest team={row.team} size={26} />
                    {row.team.name}
                  </span>
                </td>
                <td>{row.played}</td>
                <td>{row.won}</td>
                <td>{row.drawn}</td>
                <td>{row.lost}</td>
                <td>{row.goalsFor}</td>
                <td>{row.goalsAgainst}</td>
                <td>{row.goalDiff > 0 ? `+${row.goalDiff}` : row.goalDiff}</td>
                <td className="points">{row.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="legend">Victoria = 3 pts · Empate = 1 pt · Derrota = 0 pts. Desempate: diferencia de goles y goles a favor.</p>
    </section>
  );
}

export default StandingsTable;
