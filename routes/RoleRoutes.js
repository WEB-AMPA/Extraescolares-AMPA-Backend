import express from "express";
import {
  createRole,
  getRoles,
  getRoleById,
  updateRole,
  deleteRole,
} from "../controllers/RoleController.js";
import { authenticate, authorize } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/roles", authenticate, authorize(["admin"]), createRole);
router.get("/roles", authenticate, authorize(["admin"]), getRoles);
router.get("/roles/:id", authenticate, authorize(["admin"]), getRoleById);
router.put("/roles/:id", authenticate, authorize(["admin"]), updateRole);
router.delete("/roles/:id", authenticate, authorize(["admin"]), deleteRole);

export default router;
