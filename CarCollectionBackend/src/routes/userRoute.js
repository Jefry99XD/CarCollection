const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

// Rutas CRUD básicas
router.post("/createUser", userController.createUser); // Crear usuario
router.get("/getUsers", userController.getUsers); // Obtener todos los usuarios
router.get("/getUser/:id", userController.getUserById); // Obtener usuario por ID
router.put("/updateUser/:id", userController.updateUser); // Actualizar usuario
router.delete("/deleteUser/:id", userController.deleteUser); // Eliminar usuario

// Rutas para amigos
router.post("/add-friend", userController.addFriend); // Agregar amigo
router.post("/remove-friend", userController.removeFriend); // Borrar amigo

module.exports = router;
