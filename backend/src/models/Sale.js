const {Schema, model} = require("mongoose")

const saleSchema = new Schema(
  {
    
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
    product: {
      type: Schema.Types.ObjectId,
      ref: "product",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const SaleModel = model("sale", saleSchema)

module.exports = SaleModel