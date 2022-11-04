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
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model("product", productSchema);
