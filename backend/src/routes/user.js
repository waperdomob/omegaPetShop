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

routerUser.get("/", checkAuth, checkRoleAuth(["VENDEDOR"]), renderUser);
routerUser.post("/", createUser);
routerUser.get(
  "/:id",
  checkAuth,
  checkRoleAuth(["user"]),
  renderUserEdit
);
routerUser.put(
  "/:id",
  checkAuth,
  checkRoleAuth(["user", "admin"]),
  editUser
);
routerUser.delete(
  "/:id",
  checkAuth,
  checkRoleAuth(["user", "admin"]),
  deleteUser
);
routerUser.put(
  "/toogleActive/:id",
  checkAuth,
  checkRoleAuth(["user"]),
  toogleUserActive
);

module.exports = routerUser

