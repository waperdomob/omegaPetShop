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

routerProduct.get("/",checkAuth, checkRoleAuth(["VENDEDOR"]), renderProduct);
routerProduct.post("/",checkAuth, checkRoleAuth(["VENDEDOR"]), createProduct);
routerProduct.post("/imagen",checkAuth, checkRoleAuth(["VENDEDOR"]), saveImagen);
routerProduct.get("/:id",checkAuth, checkRoleAuth(["VENDEDOR"]), renderProductEdit);
routerProduct.put("/:id",checkAuth, checkRoleAuth(["VENDEDOR"]), editProduct);
routerProduct.delete("/:id",checkAuth, checkRoleAuth(["VENDEDOR"]), deleteProduct);

//routerProduct.get("/user/toogleActive/:id", checkAuth, checkRoleAuth(['VENDEDOR']), toogleUserActive )
//routerProduct.get("/user/toogleActive/:id", checkAuth, checkRoleAuth(['VENDEDOR']), toogleUserActive )

module.exports = routerProduct

