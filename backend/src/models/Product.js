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
    precioVenta: {
      type: Number,
    },
    imagen: {
      type: String,      
      required: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const ProductModel = model("product", productSchema)

module.exports = ProductModel