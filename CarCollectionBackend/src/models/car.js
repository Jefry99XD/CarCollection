const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
  name: { type: String, required: true, index: true }, 
  brand: { type: String, required: true, index: true }, 
  scale: { type: String }, 
  manufacturer: { 
    name: { type: String,  index: true }, 
    country: { type: String}, 
    year: { type: Number } 
  },
  year: { type: Number }, 
  case: { type: String},
  color: { type: String }, 
  photo: { type: String }, 
  code:{ type: String, index: true },
  tag: { type: String, index: true }, 
  series: {
    name: { type: String, required: true, index: true }, 
    number: { type: Number, required: true } 
  }
});

carSchema.index({ brand: 1, manufacturer: 1 }); 

const Car = mongoose.model("Car", carSchema);

module.exports = Car;
