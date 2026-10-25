// Cálculos de la tabla de posiciones.
// Toda la lógica está aquí para que los componentes solo se encarguen de mostrar.

const emptyRow = (team) => ({
  team,
  played: 0,
  won: 0,
  drawn: 0,
  lost: 0,
  goalsFor: 0,
  goalsAgainst: 0,
  goalDiff: 0,
  points: 0,
});

// Suma un resultado (goles anotados vs recibidos) a la fila de un equipo.
function addResult(row, scored, conceded) {
  const won = scored > conceded;
  const drawn = scored === conceded;
  const goalsFor = row.goalsFor + scored;
  const goalsAgainst = row.goalsAgainst + conceded;

  return {
    ...row,
    played: row.played + 1,
    won: row.won + (won ? 1 : 0),
    drawn: row.drawn + (drawn ? 1 : 0),
    lost: row.lost + (!won && !drawn ? 1 : 0),
    goalsFor,
    goalsAgainst,
    goalDiff: goalsFor - goalsAgainst,
    points: row.points + (won ? 3 : drawn ? 1 : 0),
  };
}

export function calculateStandings(teams, matches) {
  // 1) Una fila vacía por equipo, indexada por id (reduce)
  const initial = teams.reduce((acc, team) => {
    acc[team.id] = emptyRow(team);
    return acc;
  }, {});

  // 2) Recorremos los partidos y actualizamos local y visitante (reduce)
  const table = matches.reduce((acc, match) => {
    return {
      ...acc,
      [match.homeId]: addResult(acc[match.homeId], match.homeGoals, match.awayGoals),
      [match.awayId]: addResult(acc[match.awayId], match.awayGoals, match.homeGoals),
    };
  }, initial);

  // 3) Orden: puntos, diferencia de goles, goles a favor (sort)
  return Object.values(table).sort(
    (a, b) =>
      b.points - a.points ||
      b.goalDiff - a.goalDiff ||
      b.goalsFor - a.goalsFor ||
      a.team.name.localeCompare(b.team.name)
  );
}
