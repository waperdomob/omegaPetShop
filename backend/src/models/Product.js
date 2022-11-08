import { Schema, model } from "mongoose";

const productSchema = new Schema(
  {
    nombre: {
      type: String,
      required: true,
      trim: true,
    },
    categoria: {
      type: String,
    },
    cantidad: {
      type: Number,
      required: true,
    },
    precio: {
      type: Number,
    },
    client: {
      type: Schema.Types.ObjectId,
      ref: "client",
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model("product", productSchema);
