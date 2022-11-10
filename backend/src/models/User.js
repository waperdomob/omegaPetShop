const {Schema, model} = require("mongoose")

const userSchema = new Schema(
  {
    tipoDoc: {
      String 
    },
    numeroDoc: {
      type: String,
      required: [true, "¡El numero de documento es obligatorio!"],
    },
    name: {
      nombre: String, apellido: String
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    role: {
      type: String, enum: [ "CLIENTE",, "ADMIN" ] ,
      default: "CLIENTE",
    },
    active: {
      type: Boolean,
      default: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const UserModel = model("user", userSchema)

module.exports = UserModel
