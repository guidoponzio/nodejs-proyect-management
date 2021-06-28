const express = require('express');
const mongoose = require('mongoose');
const routesProyecto = require('./routes/proyecto');
const routesUsuario = require('./routes/usuario');
const routesCategoria = require('./routes/categoria');
const routesLider = require('./routes/lider');
require('dotenv').config()


class Server {
    constructor() {
        this.app = express() 
        this.config()
        this.routes()
    }

    config() {
        const MONGO_URI = process.env.MONGO_URI
        mongoose.set('useFindAndModify', false)
        mongoose.set('returnOriginal', false)
        mongoose
            .connect(MONGO_URI, {
                useNewUrlParser: true,
                useCreateIndex: true,
                useUnifiedTopology: true,
            })
            .then(() => console.log('DB connectada'))
            .catch((e) => console.log('Error conectado:' + e.message))

        // Settings
        this.app.set('port', process.env.PORT || 3000)

        // Middlewares
        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: true }))
    }

    routes() {
        this.app.use(routesProyecto)
        this.app.use(routesUsuario)
        this.app.use(routesCategoria)
        this.app.use(routesLider)
    }

    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('Servidor iniciado en puerto', this.app.get('port'))
        })
    }
}

const server = new Server()
server.start()