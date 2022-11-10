const { fstat } = require("fs-extra") ;
const { isValidObjectId } = require("mongoose") ;
const { handleError } = require("../helper/handleError") ;
const fs = require("fs") 

const SaleDetail = require("../models/SaleDetail") ;

const renderSaleDetail = async (req, res) => {
  try {
    const saleDetail = await SaleDetail.find();
    res.json(saleDetail);
    //    res.render("index", { tasks: tasks })
  } catch (error) {
    handleError(req, res, error);
  }
};

const createSaleDetail = async (req, res) => {
  try {
    const newSaleDetail = new SaleDetail(req.body);
    console.log(newSaleDetail)
    
    const savedSaleDetail = await newSaleDetail.save();
    //res.json(savedSaleDetail);
    res.status(201).send({mensaje: "se creo el detalle de la venta", savedSaleDetail});
  } catch (error) {
    handleError(req, res, error);
  }
};

const renderSaleDetailEdit = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      // el id no es valido.. a la mierda
      res.status(404).json({ msg: "id no valido" });
    } else {
      const saleDetailExist = await Sale.findById({ _id: id });
      if (!saleDetailExist) {
        res
          .status(404)
          .json({ msg: "no existe el producto que se va a actualizar" });
      } else {
        res.json(saleDetailExist);
      }
    }
  } catch (error) {
    handleError(req, res, error);
  }
};

const editSaleDetail = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      // el id no es valido.. a la mierda
      res.status(404).json({ msg: "id no valido" });
      return;
    }
    const saleDetailExist = await SaleDetail.findById({ _id: id });
    if (!saleDetailExist) {
      res
        .status(404)
        .json({ msg: "no existe la venta que se va a actualizar" });
      return;
    }
    const newSaleDetail = Object.assign({}, req.body);
    const saleDetail = await SaleDetail.findByIdAndUpdate(id, newSaleDetail);
    res.json(saleDetail);
  } catch (error) {
    handleError(req, res, error);
  }
};

const deleteSaleDetail = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      // el id no es valido.. a la mierda
      res.status(404).json({ msg: "id no valido" });
      return;
    }
    const saleDetailExist = await SaleDetail.findById({ _id: id });
    if (!saleDetailExist) {
      res.status(404).json({ msg: "no existe la venta que se va a borrar" });
      return;
    }
    await SaleDetail.findByIdAndDelete({ _id: id });
    res.json({ msg: "Venta Borrado" });
  } catch (error) {
    handleError(req, res, error);
  }
};

module.exports = {createSaleDetail, renderSaleDetail, renderSaleDetailEdit, editSaleDetail, deleteSaleDetail}
