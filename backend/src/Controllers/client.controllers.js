import { isValidObjectId } from "mongoose";
import { handleError } from "../helper/handleError";
import Client from "../models/Client";

export const renderClient = async (req, res) => {
  try {
    const client = await Client.find();
    res.json(client);
    //    res.render("index", { tasks: tasks })
  } catch (error) {
    handleError(req, res, error);
  }
};

export const createClient = async (req, res) => {
  try {
    const client = Client(req.body);
    const savedClient = await client.save();
    res.json(savedClient);
  } catch (error) {
    handleError(req, res, error);
  }
};

export const renderClientEdit = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      // el id no es valido.. a la mierda
      res.status(404).json({ msg: "id no valido" });
      return;
    }
    const clientExist = await Client.findById({ _id: id });
    if (!clientExist) {
      res
        .status(404)
        .json({ msg: "no existe el cliente que se va a actualizar" });
      return;
    }
    res.json(clientExist);
  } catch (error) {
    handleError(req, res, error);
  }
};

export const editClient = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      // el id no es valido.. a la mierda
      res.status(404).json({ msg: "id no valido" });
      return;
    }
    const clientExist = await Client.findById({ _id: id });
    if (!clientExist) {
      res
        .status(404)
        .json({ msg: "no existe el cliente que se va a actualizar" });
      return;
 
    }
    const newClient = Object.assign({}, req.body);
    const client = await Client.findByIdAndUpdate(id, newClient);
    res.json(newClient);
  } catch (error) {
    handleError(req, res, error);
  }
};

export const deleteClient = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      // el id no es valido.. a la mierda
      res.status(404).json({ msg: "id no valido" });
      return;
    }
    const clientExist = await Client.findById({ _id: id });
    if (!clientExist) {
      res.status(404).json({ msg: "no existe el cliente que se va a borrar" });
      return;
    }
    const delClient = await Client.findByIdAndDelete(id);
    res.json({ msg: "Cliente Borrado" });
    res.json(delClient);
  } catch (error) {
    handleError(req, res, error);
  }
};
