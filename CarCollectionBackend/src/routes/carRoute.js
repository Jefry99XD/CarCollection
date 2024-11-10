const express = require('express');
const router = express.Router();
const carController = require('../controllers/carController');

// Rutas para el CRUD de coches
router.post('/addCar', carController.createCar); // Crear un coche
router.get('/getCars', carController.getAllCars); // Obtener todos los coches
router.get('/getCar/:id', carController.getCarById); // Obtener un coche por ID
router.put('/updateCar/:id', carController.updateCar); // Actualizar un coche por ID
router.delete('/deleteCar/:id', carController.deleteCar); // Borrar un coche por ID

module.exports = router;
