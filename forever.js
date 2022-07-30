import express from "express";
import os from "os"; // es propia de node para obtener informacion del sistema

const PORT = process.argv[2] || 4000;

/** Forever no ocupa la terminal.
 *  Si se cae el servidor forever lo reinicia.
 *  💩 Desventaja: no permite generar CLUSTERs (multiples procesos en un mismo puerto).
 *  Es equivalente a nodemon pero para producción.
 *  Se pueden levantar multiples servidores en una sola aplicación pero en diferentes PUERTOS.
 *  npm install forever -g
 *  Para correr forever: forever start forever.js 3000
 *  Comandos:
 *  🔸forever stop [PID]
 *  🔸forever list
 *  🔸forever restart [PID]
 *  🔸forever start [PID]
 *  🔸forever stopall
 */

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  console.log(
    `Master PID ${process.pid}. Cantidad de procesadores: ${os.cpus().length}`
  );
  res.send(
    `Master PID ${process.pid}. Cantidad de procesadores: ${os.cpus().length}`
  );
});

const server = app.listen(PORT, () =>
  console.log(
    `🚀 Server started on port ${PORT}. Subproceso PID: ${process.pid}`
  )
);
server.on("error", (err) => console.log(err));
