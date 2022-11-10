const {Schema, model} = require("mongoose")

const saleSchema = new Schema(
  {
    
    metodoPago: {
      type: String, enum: [ "Tarjeta Crédito", "Tarjeta Débito", "PSE" ] ,
      default: "Tarjeta Crédito",
    },    
    fecha: {
      type: Date,
      default: new Date(),
    },
    total: {
      type: Number,
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

const SaleModel = model("sale", saleSchema)

module.exports = SaleModel