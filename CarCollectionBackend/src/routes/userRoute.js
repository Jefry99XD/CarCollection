const express = require("express");
const userController = require("../controllers/userController");
const {protect} = require("../services/authMiddleware")

const router = express.Router();

// Rutas CRUD básicas
router.post("/createUser", userController.createUser); // Crear usuario (sin protección)
router.get("/getUsers", protect, userController.getUsers); // Obtener todos los usuarios
router.get("/getUser/:id", protect, userController.getUserById); // Obtener usuario por ID
router.put("/updateUser/:id", protect, userController.updateUser); // Actualizar usuario
router.delete("/deleteUser/:id", protect, userController.deleteUser); // Eliminar usuario

// Rutas para amigos
router.post("/add-friend", protect, userController.addFriend); // Agregar amigo
router.post("/remove-friend", protect, userController.removeFriend); // Borrar amigo

// Sesión
router.post("/login", userController.loginUser); // Iniciar sesión (sin protección)
router.post("/logout", protect, userController.logoutUser); // Cerrar sesión (protegido)

module.exports = router;
