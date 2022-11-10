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

routerProduct.get("/",checkAuth,checkRoleAuth(["CLIENTE","ADMIN"]), renderProduct);
routerProduct.post("/",checkAuth, checkRoleAuth(["ADMIN"]), createProduct);
routerProduct.post("/imagen",checkAuth, checkRoleAuth(["ADMIN"]), saveImagen);
routerProduct.get("/:id",checkAuth, checkRoleAuth(["ADMIN"]), renderProductEdit);
routerProduct.put("/:id",checkAuth, checkRoleAuth(["ADMIN"]), editProduct);
routerProduct.delete("/:id",checkAuth, checkRoleAuth(["ADMIN"]), deleteProduct);

//routerProduct.get("/user/toogleActive/:id", checkAuth, checkRoleAuth(['VENDEDOR']), toogleUserActive )
//routerProduct.get("/user/toogleActive/:id", checkAuth, checkRoleAuth(['VENDEDOR']), toogleUserActive )

module.exports = routerProduct

