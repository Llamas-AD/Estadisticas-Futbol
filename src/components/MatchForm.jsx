import { useState } from "react";
import Crest from "./Crest";

// Props: teams (lista) y onAddMatch (función que guarda el partido en App)
function MatchForm({ teams, onAddMatch }) {
  const [homeId, setHomeId] = useState("");
  const [awayId, setAwayId] = useState("");
  const [homeGoals, setHomeGoals] = useState("");
  const [awayGoals, setAwayGoals] = useState("");
  const [error, setError] = useState("");

  const findTeam = (id) => teams.find((team) => team.id === Number(id));
  const homeTeam = findTeam(homeId);
  const awayTeam = findTeam(awayId);

  // Un marcador válido es un entero no negativo escrito solo con dígitos
  const isValidScore = (value) => /^\d+$/.test(value.trim());

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!homeId || !awayId) {
      setError("Selecciona el equipo local y el visitante.");
      return;
    }
    if (homeId === awayId) {
      setError("El equipo local y el visitante no pueden ser el mismo.");
      return;
    }
    if (!isValidScore(homeGoals) || !isValidScore(awayGoals)) {
      setError("Los marcadores deben ser números enteros mayores o iguales a 0.");
      return;
    }

    onAddMatch({
      homeId: Number(homeId),
      awayId: Number(awayId),
      homeGoals: Number(homeGoals),
      awayGoals: Number(awayGoals),
    });

    // Limpiamos el formulario para el siguiente partido
    setHomeId("");
    setAwayId("");
    setHomeGoals("");
    setAwayGoals("");
    setError("");
  };

  return (
    <section className="panel">
      <h2 className="section-title">Registrar partido</h2>

      <form className="match-form" onSubmit={handleSubmit} noValidate>
        <div className="side">
          <label htmlFor="home">Local</label>
          <select id="home" value={homeId} onChange={(e) => setHomeId(e.target.value)}>
            <option value="">Elige un equipo</option>
            {teams.map((team) => (
              <option key={team.id} value={team.id}>
                {team.name}
              </option>
            ))}
          </select>
          <input
            type="text"
            inputMode="numeric"
            placeholder="Goles"
            aria-label="Goles del local"
            value={homeGoals}
            onChange={(e) => setHomeGoals(e.target.value)}
          />
        </div>

        <div className="versus">
          <div className="preview">
            {homeTeam ? <Crest team={homeTeam} size={40} /> : <span className="crest-empty" />}
            <span className="vs">VS</span>
            {awayTeam ? <Crest team={awayTeam} size={40} /> : <span className="crest-empty" />}
          </div>
        </div>

        <div className="side">
          <label htmlFor="away">Visitante</label>
          <select id="away" value={awayId} onChange={(e) => setAwayId(e.target.value)}>
            <option value="">Elige un equipo</option>
            {teams.map((team) => (
              <option key={team.id} value={team.id}>
                {team.name}
              </option>
            ))}
          </select>
          <input
            type="text"
            inputMode="numeric"
            placeholder="Goles"
            aria-label="Goles del visitante"
            value={awayGoals}
            onChange={(e) => setAwayGoals(e.target.value)}
          />
        </div>

        {error && (
          <p className="form-error" role="alert">
            {error}
          </p>
        )}

        <button type="submit" className="btn-primary">
          Guardar resultado
        </button>
      </form>
    </section>
  );
}

export default MatchForm;
