const { fstat } = require("fs-extra") ;
const { isValidObjectId } = require("mongoose") ;
const { handleError } = require("../helper/handleError") ;
const fs = require("fs") 

const Sale = require("../models/Sale") ;
const SaleDetail = require("../models/SaleDetail") ;

const renderSale = async (req, res) => {
  try {
    const sale = await Sale.find();
    res.json(sale);
    //    res.render("index", { tasks: tasks })
  } catch (error) {
    handleError(req, res, error);
  }
};

const createSale = async (req, res) => {
  try {
    const newSale = new Sale(req.body);
    const savedSale = await newSale.save();

    const idVenta = savedSale.id;

    //Se obtienen los productos del carrito y se guardan como detalle de venta, despues de guardar la venta
    for (let clave in req.body["productos"]){
      //Se agrega el id de la venta al detalleVenta
      req.body["productos"][clave].venta = idVenta;
      const newSaleDetail = new SaleDetail(req.body["productos"][clave]);//se crea el objeto SaleDetail
      await newSaleDetail.save();//Se guarda el detalle de la venta
    }
    
    res.status(201).send({mensaje: "se creo la venta", savedSale});
  } catch (error) {
    handleError(req, res, error);
  }
};

const renderSaleEdit = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      // el id no es valido.. a la mierda
      res.status(404).json({ msg: "id no valido" });
    } else {
      const saleExist = await Sale.findById({ _id: id });
      const saleDetails = await SaleDetail.find({venta:id});
      if (!saleExist) {
        res
          .status(404)
          .json({ msg: "no existe la venta que se va a actualizar" });
      } else {
        res.json({saleExist,saleDetails});
      }
    }
  } catch (error) {
    handleError(req, res, error);
  }
};

const editSale = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      // el id no es valido.. a la mierda
      res.status(404).json({ msg: "id no valido" });
      return;
    }
    const saleExist = await Sale.findById({ _id: id });
    if (!saleExist) {
      res
        .status(404)
        .json({ msg: "no existe la venta que se va a actualizar" });
      return;
    }
    const newSale = Object.assign({}, req.body);
    const sale = await Sale.findByIdAndUpdate(id, newSale);
    res.json(sale);
  } catch (error) {
    handleError(req, res, error);
  }
};

const deleteSale = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      // el id no es valido.. a la mierda
      res.status(404).json({ msg: "id no valido" });
      return;
    }
    const saleExist = await Sale.findById({ _id: id });
    if (!saleExist) {
      res.status(404).json({ msg: "no existe la venta que se va a borrar" });
      return;
    }
    await Sale.findByIdAndDelete({ _id: id });
    res.json({ msg: "Venta Borrado" });
  } catch (error) {
    handleError(req, res, error);
  }
};

module.exports = {renderSale, createSale, renderSaleEdit, editSale, deleteSale}
