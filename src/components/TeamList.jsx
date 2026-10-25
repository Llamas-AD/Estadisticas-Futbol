import Crest from "./Crest";

// Props: teams (lista de equipos)
function TeamList({ teams }) {
  return (
    <section className="panel">
      <h2 className="section-title">Equipos del torneo</h2>
      <div className="team-grid">
        {teams.map((team) => (
          <article className="team-card" key={team.id}>
            <Crest team={team} size={52} />
            <h3>{team.name}</h3>
            <span className="team-id">ID #{team.id}</span>
          </article>
        ))}
      </div>
    </section>
  );
}

export default TeamList;
