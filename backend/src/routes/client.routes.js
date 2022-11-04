import { Router } from "express";

import {
  renderClient,
  createClient,
  renderClientEdit,
  editClient,
  deleteClient,
} from "../Controllers/client.controllers";
import { checkAuth } from "../middleware/auth";
import { checkRoleAuth } from "../middleware/roleAuth";

const router = Router();

router.get("/", renderClient);
router.post("/", createClient);
router.get("/:id", renderClientEdit);
router.put("/:id", editClient);
router.delete("/:id", deleteClient);

//router.get("/user/toogleActive/:id", checkAuth, checkRoleAuth(['user']), toogleUserActive )
//router.get("/user/toogleActive/:id", checkAuth, checkRoleAuth(['user']), toogleUserActive )

export default router;
