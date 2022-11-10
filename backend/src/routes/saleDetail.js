const { Router } = require("express");
const {
  renderSaleDetail,
  createSaleDetail,
  deleteSaleDetail,
  editSaleDetail,
  renderSaleDetailEdit,
} = require("../Controllers/saleDetail.controllers");

const { checkAuth } =require ("../middleware/auth");
const { checkRoleAuth } = require ("../middleware/roleAuth");

const routerSaleDetail = Router();

routerSaleDetail.get("/",checkAuth, checkRoleAuth(["CLIENTE","ADMIN"]), renderSaleDetail);
routerSaleDetail.post("/",checkAuth, checkRoleAuth(["CLIENTE","ADMIN"]), createSaleDetail);
routerSaleDetail.get("/:id",checkAuth, checkRoleAuth(["CLIENTE","ADMIN"]), renderSaleDetailEdit);
routerSaleDetail.put("/:id",checkAuth, checkRoleAuth(["CLIENTE","ADMIN"]), editSaleDetail);
routerSaleDetail.delete("/:id",checkAuth, checkRoleAuth(["CLIENTE","ADMIN"]), deleteSaleDetail);

//routerSaleDetail.get("/user/toogleActive/:id", checkAuth, checkRoleAuth(['user']), toogleUserActive )
//routerSaleDetail.get("/user/toogleActive/:id", checkAuth, checkRoleAuth(['user']), toogleUserActive )

module.exports = routerSaleDetail
