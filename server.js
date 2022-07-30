import express from 'express'
import apiRoutes from './src/routes/apiRoutes.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/', apiRoutes)


const PORT = parseInt(process.argv[2]) || 8080;


const server = app.listen(PORT, () => {
    console.log(`Escuchando en puerto ${PORT} - PID WORKER ${process.pid}`)
})
server.on("error", (err) => console.log(err))

