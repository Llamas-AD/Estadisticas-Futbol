# Copa Caribe — Panel de resultados de fútbol

Aplicación web hecha con **React (componentes funcionales + Hooks)** y **Vite** para registrar los resultados de un torneo de fútbol aficionado y consultar la tabla de posiciones, que se calcula sola. No usa backend: los datos viven en memoria mientras la página está abierta.

## Funcionalidades

- **6 equipos** con escudo propio (dibujado en SVG), nombre e id único.
- **Registro de partidos**: equipo local, visitante y marcador, con validaciones:
  - No se puede elegir el mismo equipo en ambos lados.
  - Los marcadores deben ser números enteros mayores o iguales a 0.
- **Historial** de resultados con escudos y nombres, **filtro por equipo** y botón para **eliminar**.
- **Tabla de posiciones** automática: PJ, G, E, P, GF, GC, DG y Puntos (3 por victoria, 1 por empate, 0 por derrota). Orden: puntos → diferencia de goles → goles a favor.
- Mensajes cuando no hay partidos y botón para cargar 6 partidos de ejemplo.
- Diseño **adaptable a móviles**.

## Requisitos previos

- [Node.js](https://nodejs.org/) 18 o superior (incluye `npm`).

```bash
node -v
npm -v
```

## Cómo ejecutar

1. Entra a la carpeta del proyecto:

   ```bash
   cd panel-futbol
   ```

2. Instala las dependencias (solo la primera vez, entre 15 segundos y 2 minutos según el internet):

   ```bash
   npm install
   ```

3. Inicia el servidor de desarrollo (2-5 segundos):

   ```bash
   npm run dev
   ```

4. Abre <http://localhost:5173> en el navegador.

### Otros comandos

| Comando           | Qué hace                                              |
| ----------------- | ----------------------------------------------------- |
| `npm run build`   | Genera la versión de producción en `dist/`            |
| `npm run preview` | Sirve localmente la versión de producción             |

## Estructura

```
panel-futbol/
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx                  ← punto de entrada
    ├── App.jsx                   ← estado principal y acciones
    ├── index.css                 ← estilos
    ├── data/
    │   └── teams.js              ← equipos y partidos de ejemplo
    ├── utils/
    │   └── standings.js          ← cálculo de la tabla (reduce + sort)
    └── components/
        ├── Crest.jsx             ← escudo SVG
        ├── TeamList.jsx          ← tarjetas de equipos
        ├── MatchForm.jsx         ← formulario con validaciones
        ├── StandingsTable.jsx    ← tabla de posiciones
        └── MatchHistory.jsx      ← historial, filtro y eliminar
```

## Tecnologías

React 18 (`useState`), Vite 5 y CSS puro.
