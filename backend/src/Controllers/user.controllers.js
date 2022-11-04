import User from "../models/User";
import { encrypt, compare } from "../helper/handleBcrypt";
import { isValidObjectId } from "mongoose";
import { handleError } from "../helper/handleError";

export const renderUser = async (req, res) => {
  try {
    const user = await User.find();
    res.json(user);
    //    res.render("index", { tasks: tasks })
  } catch (error) {
    handleError(req, res, error);
  }
};

export const createUser = async (req, res) => {
  try {
    const users = User(req.body);
    users.password = await encrypt(users.password);
    const userSaved = await users.save();
    res.json({ msg: "usuarios salvado" });
  } catch (error) {
    handleError(req, res, error);
  }
};

export const renderUserEdit = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      // el id no es valido.. a la mierda
      res.status(404).json({ msg: "id no valido" });
      return;
    }
    const userExist = await User.findById({ _id: id });
    if (!userExist) {
      res
        .status(404)
        .json({ msg: "no existe el usuario que se va a actualizar" });
      return;
    }
    res.json(userExist);
  } catch (error) {
    handleError(req, res, error);
  }
};

export const editUser = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      // el id no es valido.. a la mierda
      res.status(404).json({ msg: "id no valido" });
      return;
    }
    const userExist = await User.findById({ _id: id });
    if (!userExist) {
      res
        .status(404)
        .json({ msg: "no existe el usuario que se va a actualizar" });
      return;
    }
    const newUser = Object.assign({}, req.body);
    const cmp = await compare(newUser.password, userExist.password);
    if (!cmp) {
      newUser.password = await encrypt(newUser.password);
    } else {
      newUser.password = userExist.password;
    }
    const user = await User.findByIdAndUpdate(id, newUser);
    res.json(newUser);
  } catch (error) {
    handleError(req, res, error);
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      // el id no es valido.. a la mierda
      res.status(404).json({ msg: "id no valido" });
      returnº;
    }
    const userExist = await User.findById({ _id: id });
    if (!userExist) {
      res.status(404).json({ msg: "no existe el cliente que se va a borrar" });
      return;
    }
    const delUser = await User.findByIdAndDelete(id);
    res.json({ atencion: "Usuario Borrado" });
    res.json(delUser);
  } catch (error) {
    handleError(req, res, error);
  }
};

//
export const toogleUserActive = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      // el id no es valido.. a la mierda
      res.status(404).json({ msg: "id no valido" });
      return;
    }
    const userExist = await User.findById({ _id: id });
    if (!userExist) {
      res
        .status(404)
        .json({ msg: "no existe el usuario que se va a cambiar el estado" });
      return;
    }
    userExist.active = await !userExist.active;
    await userExist.save();
    res.json(userExist);
  } catch (error) {
    handleError(req, res, error);
  }
};