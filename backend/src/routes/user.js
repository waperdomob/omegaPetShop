const { Router } = require("express");

const {
  renderUser,
  createUser,
  renderUserEdit,
  deleteUser,
  editUser,
  toogleUserActive,
} = require("../Controllers/user.controllers");
const { checkAuth } = require("../middleware/auth");
const { checkRoleAuth } = require("../middleware/roleAuth");

const routerUser = Router();

routerUser.get("/", checkAuth, checkRoleAuth(["CLIENTE","ADMIN"]), renderUser);
routerUser.post("/", createUser);
routerUser.get(
  "/:id",
  checkAuth,
  checkRoleAuth(["CLIENTE","ADMIN"]),
  renderUserEdit
);
routerUser.put(
  "/:id",
  checkAuth,
  checkRoleAuth(["CLIENTE","ADMIN"]),
  editUser
);
routerUser.delete(
  "/:id",
  checkAuth,
  checkRoleAuth(["CLIENTE","ADMIN"]),
  deleteUser
);
routerUser.put(
  "/toogleActive/:id",
  checkAuth,
  checkRoleAuth(["CLIENTE","ADMIN"]),
  toogleUserActive
);

module.exports = routerUser

