const { Schema, model } = require("mongoose");
<<<<<<< HEAD
require('mongoose-type-email');
=======
>>>>>>> cc4507bce444a3b404cf0408c8561585763022fd

const Lider = new Schema({
  nombre: { type: String, required: true},
  rol: { type: String, required: true},
<<<<<<< HEAD
  email: { type: mongoose.SchemaTypes.Email, required: true}
});

module.exports = model("Lider", Lider);
=======
  email: {type: String, required: true}
});

module.exports = model("Lider", Lider);
>>>>>>> cc4507bce444a3b404cf0408c8561585763022fd
