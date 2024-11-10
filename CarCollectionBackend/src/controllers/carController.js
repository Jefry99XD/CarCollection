const Car = require('../models/car'); // Asegúrate de que la ruta sea correcta

// Crear un nuevo coche
exports.createCar = async (req, res) => {
  try {
    const newCar = new Car(req.body);
    await newCar.save();
    return res.status(201).json(newCar);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// Obtener todos los coches
exports.getAllCars = async (req, res) => {
  try {
    const cars = await Car.find();
    return res.status(200).json(cars);
  } catch (error) {
    return res.status(500).json({ message: error.message });
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

// Actualizar un coche por ID
exports.updateCar = async (req, res) => {
  try {
    const updatedCar = await Car.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // Devuelve el documento actualizado
      runValidators: true, // Asegura que se apliquen las validaciones
    });
    if (!updatedCar) {
      return res.status(404).json({ message: 'Coche no encontrado' });
    }
    return res.status(200).json(updatedCar);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
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
