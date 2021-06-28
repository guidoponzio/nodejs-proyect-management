const { Router } = require("express");
const ObjectId = require("mongoose").Types.ObjectId;
const AuthService = require("../services/auth");
const Lider = require("../models/Lider");

class LiderRoutes {
    constructor() {
        this.router = Router();
        this.routes();
    }

    routes() {

        // Middleware de autorizacion con JWT  
        // this.router.use(AuthService.middleware);
        this.router.get("/lider", AuthService.middleware, this.obtenerTodos);
        this.router.get("/lider/:id", AuthService.middleware, this.obtenerPorId);
        this.router.post("/lider", AuthService.middleware, this.crear);
        this.router.put("/lider", AuthService.middleware, this.modificar);
        this.router.delete("/lider/:id", AuthService.middleware, this.borrarPorId)
    }

    async crear(req, res) {
        const data = req.body;
        if (
            !data.nombre ||
            !data.rol ||
            !data.email
        ) {
            res.status(400).send("Parametros inválidos");
        }
        const Lidernew = await Lider.create(data);
        res.json(Lidernew);
    }

    async modificar(req, res) {
        console.log(req.body)
        const data = req.body;
        if (
            !data.nombre ||
            !data.rol ||
            !data.email ||
            !data.id
        ) {
            res.status(400).send("Parametros inválidos");
        }
        const liderEdit = await Lider.findByIdAndUpdate(data.id, data);
        console.log(liderEdit)
        if (liderEdit) {
            res.send("Lider modificado");
        }
    }

    async obtenerTodos(req, res) {
        const data = await Lider.find({});
        res.json(data);
    }

    async obtenerPorId(req, res) {
        if (!ObjectId.isValid(req.params.id)) {
            res.status(400).send("ID invalido");
        }
        const data = await Lider.findById(req.params.id);
        if (!data) {
            res.status(400).send("Lider no encontrado");
        }
        res.json(data);
    }

    async borrarPorId(req, res) {

        if (!ObjectId.isValid(req.params.id)) {
            res.status(400).send("ID invalido");
        }
        const data = await Lider.findByIdAndDelete(req.params.id);
        if (!data) {
            res.status(400).send("Lider no encontrado");
        }
        res.json(data);
    }
}

const liderRoutes = new LiderRoutes();
module.exports = liderRoutes.router;
