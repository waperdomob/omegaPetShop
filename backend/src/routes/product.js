const { Router } = require("express");

const {
  renderProduct,
  createProduct,
  saveImagen,
  renderProductEdit,
  editProduct,
  deleteProduct,
} = require("../Controllers/product.controllers");

const { checkAuth } =require ("../middleware/auth");
const { checkRoleAuth } = require ("../middleware/roleAuth");

const routerProduct = Router();

routerProduct.get("/", renderProduct);
routerProduct.post("/", createProduct);
routerProduct.post("/imagen", saveImagen);
routerProduct.get("/:id", renderProductEdit);
routerProduct.put("/:id", editProduct);
routerProduct.delete("/:id", deleteProduct);

//routerProduct.get("/user/toogleActive/:id", checkAuth, checkRoleAuth(['user']), toogleUserActive )
//routerProduct.get("/user/toogleActive/:id", checkAuth, checkRoleAuth(['user']), toogleUserActive )

module.exports = routerProduct

