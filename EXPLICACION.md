# Explicación: componentes, estado y cálculos

## 1. Componentes creados

| Componente      | Archivo                            | Función                                                        |
| --------------- | ---------------------------------- | -------------------------------------------------------------- |
| `App`           | `src/App.jsx`                      | Guarda el estado, define las acciones y calcula la tabla       |
| `TeamList`      | `src/components/TeamList.jsx`      | Muestra los 6 equipos en tarjetas                              |
| `Crest`         | `src/components/Crest.jsx`         | Dibuja el escudo SVG de un equipo (se reutiliza en todos lados) |
| `MatchForm`     | `src/components/MatchForm.jsx`     | Formulario para registrar un partido, con validaciones         |
| `StandingsTable`| `src/components/StandingsTable.jsx`| Pinta la tabla de posiciones                                   |
| `MatchHistory`  | `src/components/MatchHistory.jsx`  | Lista de partidos, filtro por equipo y botón de eliminar       |

`Crest` es el más reutilizado: aparece en las tarjetas, en la vista previa del formulario, en la tabla y en el historial. Se escribe una sola vez y recibe el equipo por props.

## 2. Manejo del estado (`useState`)

**En `App`** (datos compartidos por varios componentes):

```jsx
const [matches, setMatches] = useState([]);          // partidos registrados
const [nextId, setNextId] = useState(1);             // id único del siguiente partido
const [filterTeamId, setFilterTeamId] = useState("all"); // filtro del historial
```

**En `MatchForm`** (datos que solo usa el formulario): `homeId`, `awayId`, `homeGoals`, `awayGoals` y `error`.

**Idea clave:** la tabla de posiciones **no se guarda en el estado**. Se calcula en cada render a partir de `matches`:

```jsx
const standings = calculateStandings(teams, matches);
```

Así nunca puede quedar desactualizada: al registrar o eliminar un partido cambia `matches`, React vuelve a ejecutar `App` y la tabla se recalcula sola. Lo mismo pasa con el historial filtrado.

**Props:** los datos bajan de `App` a los hijos (`teams`, `matches`, `rows`) y las acciones suben como funciones (`onAddMatch`, `onDelete`, `onFilterChange`, `onLoadSample`).

## 3. Eventos y validaciones

| Evento       | Dónde                         | Qué hace                                                    |
| ------------ | ----------------------------- | ----------------------------------------------------------- |
| `onSubmit`   | `<form>` de `MatchForm`       | Valida y registra el partido (`event.preventDefault()` evita recargar la página) |
| `onChange`   | selects e inputs del formulario | Actualizan el estado de cada campo                         |
| `onChange`   | select del historial          | Cambia el filtro por equipo                                 |
| `onClick`    | botón "Eliminar"              | Borra el partido por su id                                  |
| `onClick`    | botón "Cargar ejemplo"        | Agrega 6 partidos de muestra                                |

Validaciones en `handleSubmit` (se revisan en este orden, con un mensaje distinto cada una):

1. Que se hayan elegido local y visitante.
2. Que no sea el mismo equipo (`homeId === awayId`).
3. Que ambos marcadores sean enteros no negativos, con la expresión regular `/^\d+$/` (rechaza letras, decimales, negativos y vacíos).

## 4. Cálculos (`src/utils/standings.js`)

**Paso 1 — `reduce()` para crear una fila vacía por equipo** (PJ, G, E, P, GF, GC, DG y puntos en 0).

**Paso 2 — `reduce()` sobre los partidos.** Por cada partido se actualizan dos filas: el local (goles anotados = `homeGoals`) y el visitante (goles anotados = `awayGoals`). La función `addResult` hace la cuenta:

- Victoria: `+1 G`, `+3 puntos`
- Empate: `+1 E`, `+1 punto`
- Derrota: `+1 P`, `+0 puntos`
- Siempre: `+1 PJ`, suma GF y GC, y `DG = GF − GC`

**Paso 3 — `sort()`** con este criterio, en orden:

```js
b.points - a.points || b.goalDiff - a.goalDiff || b.goalsFor - a.goalsFor
```

Si el primer criterio empata (resultado 0), `||` pasa al siguiente.

**Otros métodos:** `map()` pinta equipos, filas y partidos (cada uno con `key` única), y `filter()` se usa para eliminar un partido y para filtrar el historial por equipo.

## 5. Ejemplo de comprobación

Con los 6 partidos de ejemplo, Caimanes FC (2-1 a Halcones y 1-1 con Leones) debe tener PJ 2, G 1, E 1, P 0, GF 3, GC 2, DG +1 y 4 puntos.

## 6. Guion para el video (1:30 a 2 min)

| Tiempo      | Qué mostrar                                                                      |
| ----------- | -------------------------------------------------------------------------------- |
| 0:00 – 0:15 | Presentar la app, los 6 equipos y la tabla en ceros con su mensaje               |
| 0:15 – 0:40 | Probar errores: mismo equipo en ambos lados y marcador con letras o negativo     |
| 0:40 – 1:10 | Registrar 2-3 partidos y ver cómo cambia la tabla al instante                    |
| 1:10 – 1:30 | Filtrar el historial por un equipo                                               |
| 1:30 – 1:50 | Eliminar un partido y mostrar que la tabla se recalcula                          |
