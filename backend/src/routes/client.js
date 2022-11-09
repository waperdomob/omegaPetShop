const { Router } = require("express");

const {
  renderClient,
  createClient,
  renderClientEdit,
  editClient,
  deleteClient,
} = require("../Controllers/client.controllers");

const { checkAuth } = require("../middleware/auth");
const { checkRoleAuth } = require("../middleware/roleAuth");

const routerCient = Router();

routerCient.get("/", renderClient);
routerCient.post("/", createClient);
routerCient.get("/:id", renderClientEdit);
routerCient.put("/:id", editClient);
routerCient.delete("/:id", deleteClient);

//routerCient.get("/user/toogleActive/:id", checkAuth, checkRoleAuth(['user']), toogleUserActive )
//routerCient.get("/user/toogleActive/:id", checkAuth, checkRoleAuth(['user']), toogleUserActive )

module.exports = routerCient
