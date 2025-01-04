const Car = require('../models/car'); // Asegúrate de que la ruta sea correcta
const User = require('../models/user')

const path = require('path');
const fs = require('fs');
const csv = require('csv-parser');
// Crear un nuevo coche
exports.createCar = async (req, res) => {
  try {
    const { userId, ...carData } = req.body;

    // Verifica si el usuario existe
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Crea un nuevo coche
    const newCar = new Car(carData);
    await newCar.save();

    // Agrega el coche a la colección del usuario
    user.CarCollection.push(newCar._id);
    await user.save();

    return res.status(201).json(newCar);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// Obtener todos los coches de un usuario específico
exports.getCarsByUser = async (req, res) => {
  try {
    const { userId } = req.body;
    console.log("Received userId:", userId);

    // Verifica si el userId es válido (puedes usar una validación extra si es necesario)
    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    // Verifica si el usuario existe en la base de datos
    const user = await User.findById(userId).populate('CarCollection'); // Asegúrate que 'CarCollection' es el campo correcto
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Verifica si el usuario tiene coches en su colección
    if (!user.CarCollection || user.CarCollection.length === 0) {
      return res.status(404).json({ message: 'No cars found for this user' });
    }

    // Retorna la colección de coches del usuario
    return res.status(200).json(user.CarCollection);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error retrieving cars', error: error.message });
  }
};


// Obtener un coche por ID
exports.getCarById = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) {
      return res.status(404).json({ message: 'Coche no encontrado' });
    }
    return res.status(200).json(car);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.updateCar = async (req, res) => {
  try {
    const { userId } = req.body; // Recibir el ID del usuario en la solicitud
    const carId = req.params.id;

    // Buscar al usuario y verificar si el coche está en su colección
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    if (!user.CarCollection.includes(carId)) {
      return res.status(403).json({ message: 'El coche no pertenece al usuario.' });
    }

    // Actualizar el coche si pertenece al usuario
    const updatedCar = await Car.findByIdAndUpdate(carId, req.body, {
      new: true, // Devuelve el documento actualizado
      runValidators: true, // Asegura que se apliquen las validaciones
    });

    if (!updatedCar) {
      return res.status(404).json({ message: 'Coche no encontrado.' });
    }

    return res.status(200).json(updatedCar);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};


exports.uploadCsv = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded.' });
  }
  

  const filePath = path.join(__dirname, '..', 'uploads', req.file.filename); // Ruta completa al archivo cargado
  const cleanedFilePath = filePath.replace('\\src', '');

  const cars = [];

  // Leer y procesar el archivo CSV
  fs.createReadStream(filePath)
    .pipe(csv()) // Usamos csv-parser para procesar el archivo CSV
    .on('data', async (row) => {
      // Procesar cada fila del CSV

      // Aquí hacemos el mapeo de los datos, ignorando "TIPO" como mencionaste
      const carData = {
        name: row.name || 'na',
        brand: row.brand || 'na',
        color: row.COLOR || 'na',
        case: row.CASE || 'na',
        tag: row.tag || 'na',
        photo: row.photo || 'na',
        annotation: row.annotation || 'na',  // Agregar el campo de anotación
        year: row.year || 2020, // Si no hay año, poner uno por defecto
        code: row.code || 'NA', // Si no hay código, asignar NA
        series: {
          name: row.SERIE || 'Unknown Series', // Asignar nombre de serie
          number: row.seriesNumber || 0, // Asignar número de serie
        },
        manufacturer: {
          name: row.manufacturer || 'Unknown Manufacturer', // Asignar nombre del fabricante
          country: row.manufacturerCountry || 'Unknown Country', // País del fabricante
          year: row.manufacturerYear || 2020, // Año de fabricación si se tiene
        }
      };

      // Crear el objeto de coche
      const car = new Car(carData);
      cars.push(car); // Guardar temporalmente el coche en el array
    })
    .on('end', async () => {
      // Una vez que el CSV ha sido procesado, guardamos los coches en la base de datos
      try {
        await Car.insertMany(cars); // Insertar todos los coches a la vez
        return res.status(200).json({ message: 'Cars uploaded successfully!' });
      } catch (error) {
        return res.status(500).json({ message: 'Error saving cars to the database.', error: error.message });
      } finally {
        // Borrar el archivo después de procesarlo
        fs.unlinkSync(filePath); // Eliminar el archivo cargado
      }
    })
    .on('error', (error) => {
      return res.status(500).json({ message: 'Error processing the CSV file.', error: error.message });
    });
};



// Borrar un coche por ID
exports.deleteCar = async (req, res) => {
  try {
    const deletedCar = await Car.findByIdAndDelete(req.params.id);
    if (!deletedCar) {
      return res.status(404).json({ message: 'Coche no encontrado' });
    }
    return res.status(200).json({ message: 'Coche eliminado exitosamente' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
