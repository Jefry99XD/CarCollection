const express = require('express');
const router = express.Router();
const carController = require('../controllers/carController');
const multer = require('multer');
const path = require('path'); // Necesario para manipular rutas de archivos

// Configuración de almacenamiento con multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '..', 'uploads')); // Guarda los archivos en la carpeta 'uploads' en la raíz
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Nombre del archivo: timestamp + nombre original
  }
});

// Inicializa multer con la configuración de almacenamiento
const upload = multer({ storage: storage });

// Rutas para el CRUD de coches
router.post('/addCar', carController.createCar); // Crear un coche
router.get('/getCars', carController.getAllCars); // Obtener todos los coches
router.get('/getCar/:id', carController.getCarById); // Obtener un coche por ID
router.put('/updateCar/:id', carController.updateCar); // Actualizar un coche por ID
router.delete('/deleteCar/:id', carController.deleteCar); // Borrar un coche por ID

// Ruta para subir el archivo CSV y procesarlo
router.post('/uploadCsv', upload.single('file'), carController.uploadCsv); // Aquí es donde se define el middleware 'upload'

module.exports = router;
