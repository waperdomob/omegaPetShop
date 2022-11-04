import { Router } from "express";

import {
  renderUser,
  createUser,
  renderUserEdit,
  deleteUser,
  editUser,
  toogleUserActive,
} from "../Controllers/user.controllers";
import { checkAuth } from "../middleware/auth";
import { checkRoleAuth } from "../middleware/roleAuth";

const router = Router();


router.get("/", checkAuth, checkRoleAuth(["user"]), renderUser);
router.post("/", createUser);
router.get(
  "/:id",
  checkAuth,
  checkRoleAuth(["user"]),
  renderUserEdit
);
router.put(
  "/:id",
  checkAuth,
  checkRoleAuth(["user", "admin"]),
  editUser
);
router.delete(
  "/:id",
  checkAuth,
  checkRoleAuth(["user", "admin"]),
  deleteUser
);
router.put(
  "/toogleActive/:id",
  checkAuth,
  checkRoleAuth(["user"]),
  toogleUserActive
);
export default router;
