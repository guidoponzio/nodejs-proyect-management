const { Schema, model } = require("mongoose");
require('mongoose-type-email');

const Lider = new Schema({
  nombre: { type: String, required: true},
  rol: { type: String, required: true},
  email: { type: mongoose.SchemaTypes.Email, required: true}
});

module.exports = model("Lider", Lider);