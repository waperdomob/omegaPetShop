const { fstat } = require("fs-extra") ;
const { isValidObjectId } = require("mongoose") ;
const { handleError } = require("../helper/handleError") ;
const fs = require("fs") 

const Sale = require("../models/Sale") ;
const { upload } = require("../middleware/storage");

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
    console.log(newSale)
    
    const savedSale = await newSale.save();
    //res.json(savedSale);
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
      if (!saleExist) {
        res
          .status(404)
          .json({ msg: "no existe el producto que se va a actualizar" });
      } else {
        res.json(saleExist);
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
