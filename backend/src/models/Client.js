const {Schema, model} = require("mongoose")
const isEmail = require("validator/lib/isEmail");

const clientSchema = new Schema(
  {
    nombre : {
      type: String,
      required: true,
      trim: true,
    },
    direccion: {
      type: String,
      trim: true,
    },
    celular: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      required: "Email address is required",
      validate: [isEmail, "Please fill a valid email address"],
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const ClientModel = model("client", clientSchema)

module.exports = ClientModel
