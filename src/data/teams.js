// Equipos del torneo. Los escudos son propios: se dibujan con SVG
// a partir de la forma (shape), los dos colores y las siglas (short).
const teams = [
  { id: 1, name: "Junior FC",             short: "JUN", logo: "escudos/junior.png",    shape: "shield", colors: ["#e4002b", "#ffffff"] },
  { id: 2, name: "Independiente Medellín", short: "DIM", logo: "escudos/medellin.png",  shape: "shield", colors: ["#c8102e", "#1a2a6c"] },
  { id: 3, name: "Atlético Nacional",      short: "NAL", logo: "escudos/nacional.png",  shape: "round",  colors: ["#1f8a4c", "#ffffff"] },
  { id: 4, name: "Millonarios",            short: "MIL", logo: "escudos/millonarios.png", shape: "shield", colors: ["#1b4fa0", "#ffffff"] },
  { id: 5, name: "América de Cali",        short: "AME", logo: "escudos/america.png",   shape: "round",  colors: ["#c8102e", "#ffffff"] },
  { id: 6, name: "Santa Fe",               short: "SFE", logo: "escudos/santafe.png",   shape: "shield", colors: ["#d4202c", "#ffffff"] },
];
// Partidos de ejemplo para la demostración (botón "Cargar ejemplo").
export const sampleMatches = [
  { homeId: 1, awayId: 2, homeGoals: 2, awayGoals: 1 },
  { homeId: 3, awayId: 4, homeGoals: 0, awayGoals: 0 },
  { homeId: 5, awayId: 6, homeGoals: 3, awayGoals: 2 },
  { homeId: 2, awayId: 3, homeGoals: 1, awayGoals: 4 },
  { homeId: 6, awayId: 1, homeGoals: 1, awayGoals: 1 },
  { homeId: 4, awayId: 5, homeGoals: 0, awayGoals: 2 },
];

export default teams;
