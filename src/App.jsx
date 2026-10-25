import { useState } from "react";
import teams, { sampleMatches } from "./data/teams";
import { calculateStandings } from "./utils/standings";
import TeamList from "./components/TeamList";
import MatchForm from "./components/MatchForm";
import StandingsTable from "./components/StandingsTable";
import MatchHistory from "./components/MatchHistory";

function App() {
  // ----- ESTADO (useState) -----
  const [matches, setMatches] = useState([]); // partidos registrados
  const [nextId, setNextId] = useState(1); // id único para el siguiente partido
  const [filterTeamId, setFilterTeamId] = useState("all"); // filtro del historial

  // ----- ACCIONES -----
  const addMatch = (match) => {
    setMatches([...matches, { ...match, id: nextId }]);
    setNextId(nextId + 1);
  };

  const deleteMatch = (id) => {
    setMatches(matches.filter((match) => match.id !== id));
  };

  const loadSample = () => {
    const withIds = sampleMatches.map((match, index) => ({ ...match, id: nextId + index }));
    setMatches([...matches, ...withIds]);
    setNextId(nextId + withIds.length);
  };

  // ----- DATOS DERIVADOS (se recalculan en cada render) -----
  // La tabla NO se guarda en el estado: se calcula desde los partidos,
  // por eso se actualiza sola al registrar o eliminar.
  const standings = calculateStandings(teams, matches);

  const visibleMatches = matches
    .filter(
      (match) =>
        filterTeamId === "all" ||
        match.homeId === Number(filterTeamId) ||
        match.awayId === Number(filterTeamId)
    )
    .slice()
    .reverse(); // los más recientes primero

  return (
    <div className="app">
      <header className="header">
        <p className="eyebrow">Torneo aficionado</p>
        <h1>
          Copa <span>Caribe</span>
        </h1>
        <p className="subtitle">Registra los marcadores y mira la tabla de posiciones al instante.</p>
      </header>

      <TeamList teams={teams} />

      <div className="two-cols">
        <MatchForm teams={teams} onAddMatch={addMatch} />
        <StandingsTable rows={standings} hasMatches={matches.length > 0} />
      </div>

      <MatchHistory
        matches={visibleMatches}
        teams={teams}
        totalMatches={matches.length}
        filterTeamId={filterTeamId}
        onFilterChange={setFilterTeamId}
        onDelete={deleteMatch}
        onLoadSample={loadSample}
      />
    </div>
  );
}

export default App;
