import express from "express";
import morgan from "morgan";
import os from "os"; // es propia de node para obtener informacion del sistema

const PORT = process.argv[2] || 4000;

/** PM2 es un Process Manager.
 *  Podemos generar un Cluster de procesos y un fork.
 *  Nos deja la terminal libre para que el usuario pueda interactuar con el sistema.
 *  >npm install pm2 -g
 *  levantar un proceso con: pm2 start pm2.js
 *  Podemos pasarle argumentos:
 *  >pm2 start pm2.js --name="Server1" --watch -- 4000
 *  Comandos:
 *  >pm2 list
 *  >pm2 stop [PID]
 *  >pm2 restart [PID]
 *  >pm2 start [PID]
 *  >pm2 stop all
 *  >pm2 delete all
 *  Tiene un interfaz gráfica de monitoreo:
 *  >pm2 monit
 *
 *  >pm2 logs
 *
 *  Si no le digo nada genera una sola instancia FORK.
 *  Si le paso 'i 4' genera 4 instancias -> genera un CLUSTER.
 *  >pm2 start pm2.js --name="Server2" --watch -i 4  -- 4000
 *
 *  Si quiero iniciarlo con la cantidad maxima de CPUs:
 *  >pm2 start pm2.js --name="Server3" --watch -i max -- 4000
 */

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

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
