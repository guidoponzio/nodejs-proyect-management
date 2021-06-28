const { Schema, model } = require("mongoose");

const Lider = new Schema({
  nombre: { type: String, required: true},
  rol: { type: String, required: true},
  email: {type: String, required: true}
});

module.exports = model("Lider", Lider);
