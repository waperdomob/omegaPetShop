
const { isValidObjectId } = require("mongoose");
const { handleError } = require("../helper/handleError");


const Product = require("../models/Product");
const { upload } = require("../middleware/storage");

const renderProduct = async (req, res) => {
  try {
    const product = await Product.find();
    res.json(product);
    //    res.render("index", { tasks: tasks })
  } catch (error) {
    handleError(req, res, error);
  }
};

const createProduct = async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    console.log(newProduct)
    
    const savedProduct = await newProduct.save();
    //res.json(savedProduct);
    res.status(201).send({mensaje: "se creo el producto", savedProduct});
  } catch (error) {
    handleError(req, res, error);
  }
};

const saveImagen = async (req = request, res = response) => {

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({ mensaje: "No se encontro el imagen" })
  };

  // Extrae el imagen segun el nombre (en este caso "imagen")
  const {imagen} = req.files
  const imagenName = imagen.name.split(".")
  const extension = imagenName[imagenName - 1 ]
  const uploadPath = path.join(__dirname, "../imagenes/", imagen.name)

  // Usa el metodo mv() para colocar el imagen en cualquier parte del backend
  imagen.mv(uploadPath, (error) => {
    if (error) return res.status(500).send(error)

    res.send("imagen cargado corectamente")
  })

}

const renderProductEdit = async (req, res) => {
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

const editProduct = async (req, res) => {
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

const deleteProduct = async (req, res) => {
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

module.exports = {renderProduct, createProduct, saveImagen, renderProductEdit, editProduct, deleteProduct}
