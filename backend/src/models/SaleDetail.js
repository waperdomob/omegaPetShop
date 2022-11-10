const {Schema, model} = require("mongoose")

const saleDetailSchema = new Schema(
  {
      
    cantidad: {
      type: Number,
    },
    precio: {
      type: Number,
    },
    venta: {
      type: Schema.Types.ObjectId,
      ref: "sale",
    },
    producto: {
        type: Schema.Types.ObjectId,
        ref: "product",
      },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const SaleDetail = model("saleDetail", saleDetailSchema)

module.exports = SaleDetail