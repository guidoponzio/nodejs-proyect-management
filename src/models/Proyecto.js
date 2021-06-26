const { Schema, model } = require("mongoose");

const Proyecto = new Schema({
  nombre: { type: String, required: true},
  desc: { type: String, required: true},
  plazo: { type: Date , required: true},
  categoria: {
    type: Schema.Types.ObjectId,
    ref: "Categoria",
    required: true
  },
  lider: {
    type: Schema.Types.ObjectId,
    ref: "Lider",
    required: true
  }
});

module.exports = model("Proyecto", Proyecto);
