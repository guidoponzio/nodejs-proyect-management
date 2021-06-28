const { Schema, model } = require("mongoose");

const Categoria = new Schema({
  nombre: { type: String, required: true},
  desc: { type: String, required: true},
});

module.exports = model("Categoria", Categoria);
