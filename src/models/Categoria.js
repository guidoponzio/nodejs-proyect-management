const { Schema, model } = require("mongoose");

const Categoria = new Schema({
  nombre: { type: String, required: true},
<<<<<<< HEAD
  desc: { type: String, required: true},
=======
  desc: { type: String, required: true}
>>>>>>> cc4507bce444a3b404cf0408c8561585763022fd
});

module.exports = model("Categoria", Categoria);
