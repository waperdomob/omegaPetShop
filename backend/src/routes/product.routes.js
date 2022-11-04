import { Router } from "express";

import {
  renderProduct,
  createProduct,
  renderProductEdit,
  editProduct,
  deleteProduct,
} from "../Controllers/product.controllers";
import { checkAuth } from "../middleware/auth";
import { checkRoleAuth } from "../middleware/roleAuth";


const router = Router();


router.get("/", renderProduct);
router.post("/", createProduct);
router.get("/:id", renderProductEdit);
router.put("/:id", editProduct);
router.delete("/:id", deleteProduct);

//router.get("/user/toogleActive/:id", checkAuth, checkRoleAuth(['user']), toogleUserActive )
//router.get("/user/toogleActive/:id", checkAuth, checkRoleAuth(['user']), toogleUserActive )

export default router;
