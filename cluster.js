import express from "express";
import cluster from "cluster"; // es propia de node para hacer multiples procesos
import os from "os"; // es propia de node para obtener informacion del sistema

const PORT = process.env.PORT || 4000;
const nroCPUs = os.cpus().length;

/**Tenemos un Proceso Padre o Master. A partir de él generamos subprocesos o workers.
 * Si matamos el proceso master mueren sus subprocesos.
 * Podemos matar un subproceso con process.kill(pid, signal)
 */
if (cluster.isMaster) {
  console.log(
    `Master PID ${process.pid} is running. Cantidad de procesadores: ${
      os.cpus().length
    }`
  );
  for (let i = 0; i < nroCPUs; i++) {
    cluster.fork(); // crea un proceso por cada cpu
  }
} else {
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
  // Este sería el worker
  //console.log(`Process - subproceso o worker: ${process.pid} is running`);
  const server = app.listen(PORT, () =>
    console.log(
      `🚀 Server started on port ${PORT}. Subproceso PID: ${process.pid}`
    )
  );
  server.on("error", (err) => console.log(err));
}
