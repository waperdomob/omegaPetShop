const { Router } = require("express");
const {
  renderSale,
  createSale,
  deleteSale,
  editSale,
  renderSaleEdit,
} = require("../Controllers/sale.controllers");

const routerSale = Router();

routerSale.get("/", renderSale);
routerSale.post("/", createSale);
routerSale.get("/:id", renderSaleEdit);
routerSale.put("/:id", editSale);
routerSale.delete("/:id", deleteSale);

//routerSale.get("/user/toogleActive/:id", checkAuth, checkRoleAuth(['user']), toogleUserActive )
//routerSale.get("/user/toogleActive/:id", checkAuth, checkRoleAuth(['user']), toogleUserActive )

module.exports = routerSale
