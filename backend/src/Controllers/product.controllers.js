import { fstat } from "fs-extra";
import { isValidObjectId } from "mongoose";
import { handleError } from "../helper/handleError";
import fs from "fs"

import Product from "../models/Product";
import { upload } from "../middleware/storage";

export const renderProduct = async (req, res) => {
  try {
    const product = await Product.find();
    res.json(product);
    //    res.render("index", { tasks: tasks })
  } catch (error) {
    handleError(req, res, error);
  }
};

export const createProduct = async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    console.log(newProduct)
    
//<    console.log(newProduct)

    const savedProduct = await newProduct.save();
    res.json(savedProduct);
  } catch (error) {
    handleError(req, res, error);
  }
};

export const renderProductEdit = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      // el id no es valido.. a la mierda
      res.status(404).json({ msg: "id no valido" });
    } else {
      const productExist = await Product.findById({ _id: id });
      if (!productExist) {
        res
          .status(404)
          .json({ msg: "no existe el producto que se va a actualizar" });
      } else {
        res.json(productExist);
      }
    }
  } catch (error) {
    handleError(req, res, error);
  }
};

export const editProduct = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      // el id no es valido.. a la mierda
      res.status(404).json({ msg: "id no valido" });
      return;
    }
    const productExist = await Product.findById({ _id: id });
    if (!productExist) {
      res
        .status(404)
        .json({ msg: "no existe el producto que se va a actualizar" });
      return;
    }
    const newProduct = Object.assign({}, req.body);
    const product = await Product.findByIdAndUpdate(id, newProduct);
    res.json(product);
  } catch (error) {
    handleError(req, res, error);
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      // el id no es valido.. a la mierda
      res.status(404).json({ msg: "id no valido" });
      return;
    }
    const productExist = await Product.findById({ _id: id });
    if (!productExist) {
      res.status(404).json({ msg: "no existe el product que se va a borrar" });
      return;
    }
    await Product.findByIdAndDelete({ _id: id });
    res.json({ msg: "Producto Borrado" });
  } catch (error) {
    handleError(req, res, error);
  }
};
