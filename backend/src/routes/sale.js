const { Router } = require("express");
const {
  renderSale,
  createSale,
  deleteSale,
  editSale,
  renderSaleEdit,
} = require("../Controllers/sale.controllers");

const { checkAuth } =require ("../middleware/auth");
const { checkRoleAuth } = require ("../middleware/roleAuth");

const routerSale = Router();

routerSale.get("/",checkAuth, checkRoleAuth(["CLIENTE","ADMIN"]), renderSale);
routerSale.post("/",checkAuth, checkRoleAuth(["CLIENTE","ADMIN"]), createSale);
routerSale.get("/:id",checkAuth, checkRoleAuth(["CLIENTE","ADMIN"]), renderSaleEdit);
routerSale.put("/:id",checkAuth, checkRoleAuth(["CLIENTE","ADMIN"]), editSale);
routerSale.delete("/:id",checkAuth, checkRoleAuth(["CLIENTE","ADMIN"]), deleteSale);

//routerSale.get("/user/toogleActive/:id", checkAuth, checkRoleAuth(['user']), toogleUserActive )
//routerSale.get("/user/toogleActive/:id", checkAuth, checkRoleAuth(['user']), toogleUserActive )

module.exports = routerSale
