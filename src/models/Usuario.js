const { Schema, model } = require("mongoose");

const Usuario = new Schema({
  usuario: { type: String, required: true},
  contrasenia: {type: String, required: true}
});

module.exports = model("Usuario", Usuario);
