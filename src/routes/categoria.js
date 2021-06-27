const { Router } = require("express");
const ObjectId = require("mongoose").Types.ObjectId;
const AuthService = require("../services/auth");
const Categoria = require("../models/Categoria");

class CategoriaRoutes {
  constructor() {
    this.router = Router();
    this.routes();
  }

  routes() {

    // Middleware de autorizacion con JWT  
    // this.router.use(AuthService.middleware);
    this.router.get("/categoria", AuthService.middleware, this.obtenerTodos);
    this.router.get("/categoria/:id", AuthService.middleware, this.obtenerPorId);
    this.router.post("/categoria", AuthService.middleware, this.crear);
    this.router.put("/categoria", AuthService.middleware, this.modificar);
    this.router.delete("/categoria/:id", AuthService.middleware, this.borrarPorId)
  }

  async crear(req, res) {
    const data = req.body;
    if (
      !data.nombre ||
      !data.desc
    ) {
      res.status(400).send("Parametros inválidos");
    }
    const Categorianew = await Categoria.create(data);
    res.json(Categorianew);
  }

  async modificar(req, res) {
    const data = req.body;
    if (
      !data.nombre ||
      !data.desc ||
      !data.id
    ) {
      res.status(400).send("Parametros inválidos");
    }
    const categoriaEdit = await Categoria.findByIdAndUpdate(data.id, data);
    if (categoriaEdit) {
      res.send("Categoria modificada");
    }
  }

  async obtenerTodos(req, res) {
    const data = await Categoria.find({});
    res.json(data);
  }

  async obtenerPorId(req, res) {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).send("ID invalido");
    }
    const data = await Categoria.findById(req.params.id);
    if (!data) {
      res.status(400).send("Categoria no encontrado");
    }
    res.json(data);
  }

  async borrarPorId(req, res) {

    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).send("ID invalido");
    }
    const data = await Categoria.findByIdAndDelete(req.params.id);
    if (!data) {
      res.status(400).send("Categoria no encontrado");
    }
    res.json(data);
  }
}

const categoriaRoutes = new CategoriaRoutes();
module.exports = categoriaRoutes.router;
