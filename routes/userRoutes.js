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

// Crear un nuevo usuario con validación y autenticación
router.post("/", authenticate, authorize(["admin"]), validateUser, createUser);

// Obtener todos los usuarios (solo accesible por admin)
router.get("/", authenticate, authorize(["admin"]), getUsers);

// Obtener un usuario por su ID (accesible por admin)
router.get("/:id", authenticate, authorize(["admin"]), getUserById);

// Obtener usuarios por rol (accesible por admin)
router.get("/role/:roleName", authenticate, authorize(["admin"]), getUsersByRole);

// Actualizar un usuario por su ID (solo accesible por admin)
router.put("/:id", authenticate, authorize(["admin"]), updateUserById);

// Eliminar un usuario por su ID (solo accesible por admin)
router.delete("/:id", authenticate, authorize(["admin"]), deleteUserById);

export default router;

