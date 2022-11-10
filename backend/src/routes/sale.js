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

routerSale.get("/",checkAuth, checkRoleAuth(["VENDEDOR"]), renderSale);
routerSale.post("/",checkAuth, checkRoleAuth(["VENDEDOR"]), createSale);
routerSale.get("/:id",checkAuth, checkRoleAuth(["VENDEDOR"]), renderSaleEdit);
routerSale.put("/:id",checkAuth, checkRoleAuth(["VENDEDOR"]), editSale);
routerSale.delete("/:id",checkAuth, checkRoleAuth(["VENDEDOR"]), deleteSale);

//routerSale.get("/user/toogleActive/:id", checkAuth, checkRoleAuth(['user']), toogleUserActive )
//routerSale.get("/user/toogleActive/:id", checkAuth, checkRoleAuth(['user']), toogleUserActive )

module.exports = routerSale
