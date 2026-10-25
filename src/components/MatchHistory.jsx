import Crest from "./Crest";

// Props: matches (ya filtrados), teams, totalMatches, filterTeamId,
// onFilterChange, onDelete y onLoadSample
function MatchHistory({
  matches,
  teams,
  totalMatches,
  filterTeamId,
  onFilterChange,
  onDelete,
  onLoadSample,
}) {
  const findTeam = (id) => teams.find((team) => team.id === id);

  return (
    <section className="panel">
      <div className="history-head">
        <h2 className="section-title">Historial de resultados</h2>

        <select
          className="filter-select"
          value={filterTeamId}
          onChange={(e) => onFilterChange(e.target.value)}
          aria-label="Filtrar partidos por equipo"
        >
          <option value="all">Todos los equipos</option>
          {teams.map((team) => (
            <option key={team.id} value={team.id}>
              {team.name}
            </option>
          ))}
        </select>
      </div>

      {totalMatches === 0 && (
        <div className="notice">
          <p>No hay partidos registrados todavía. Usa el formulario para agregar el primero.</p>
          <button className="btn-ghost" onClick={onLoadSample}>
            Cargar 6 partidos de ejemplo
          </button>
        </div>
      )}

      {totalMatches > 0 && matches.length === 0 && (
        <p className="notice">Ese equipo todavía no ha jugado ningún partido.</p>
      )}

      <ul className="match-list">
        {matches.map((match) => {
          const home = findTeam(match.homeId);
          const away = findTeam(match.awayId);

          return (
            <li className="match-item" key={match.id}>
              <span className="match-team right">
                {home.name}
                <Crest team={home} size={30} />
              </span>

              <span className="score">
                {match.homeGoals} <i>-</i> {match.awayGoals}
              </span>

              <span className="match-team">
                <Crest team={away} size={30} />
                {away.name}
              </span>

              <button
                className="btn-delete"
                onClick={() => onDelete(match.id)}
                aria-label={`Eliminar ${home.name} contra ${away.name}`}
              >
                Eliminar
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default MatchHistory;
