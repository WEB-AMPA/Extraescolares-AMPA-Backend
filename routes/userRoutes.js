import express from "express";
import {
  createUser,
  getUsers,
  getUserById,
  updateUserById,
  deleteUserById,
  getUsersByRole,
} from "../controllers/UsersController.js";
import { authenticate, authorize } from "../middlewares/authMiddleware.js";
import { validateUser } from "../middlewares/validationMiddleware.js";

const router = express.Router();

// router.post("/", authenticate, authorize(["admin"]), validateUser, createUser);
// router.get("/", authenticate, authorize(["admin"]), getUsers);
// router.get("/:id", authenticate, authorize(["admin"]), getUserById);
// router.get("/role/:roleName", authenticate, authorize(["admin"]), getUsersByRole);
// router.put("/:id", authenticate, authorize(["admin"]), updateUserById);
// router.delete("/:id", authenticate, authorize(["admin"]), deleteUserById);

router.post("/", createUser);
router.get("/", getUsers);
router.get("/:id", getUserById);
router.get("/role/:roleName", getUsersByRole);
router.put("/:id", updateUserById);
router.delete("/:id", deleteUserById);

export default router;
