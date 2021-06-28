const { Router } = require("express");
const Categoria = require("../models/Categoria");
const ObjectId = require("mongoose").Types.ObjectId;
const AuthService = require("../services/auth");

class CategoriaRoutes {
  constructor() {
    this.router = Router();
    this.routes();
  }

  routes() {
      
    // Middleware de autorizacion con JWT  
    this.router.use(AuthService.middleware);
    this.router.get("/categoria", this.obtenerTodos);
    this.router.get("/categoria/:id", this.obtenerPorId);
    this.router.post("/categoria", this.crear);
    this.router.put("/categoria", this.modificar);
    this.router.delete("/categoria/:id", this.borrarPorId)
  }

  async crear(req, res) {
    const data = req.body;
    if (
      !data.nombre &&
      !data.descripcion
    ) {
      res.status(400).send("Parametros inválidos");
    }
    const categorianew = await Categoria.create(data);
    res.json(categorianew);
  }

  async modificar(req, res) {
    const data = req.body;
    if (
      !data.nombre &&
      !data.descripcion
    ) {
      res.status(400).send("Parametros inválidos");
    }
    const categoriaEdit = await Categoria.findByIdAndUpdate(data.id, data);
    if (categoriaEdit) {
      res.send("Modificacion correcta");
      res.json(categoriaEdit)
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

  async borrarPorId(req, res){

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

const CategoriaRoutes = new CategoriaRoutes();
module.exports = CategoriaRoutes.router;
