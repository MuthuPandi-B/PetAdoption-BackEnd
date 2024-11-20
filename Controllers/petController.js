import Pet from "../Models/petSchema.js";
import dotenv from "dotenv";
import User from "../Models/userSchema.js";

dotenv.config();

export const createPet = async (req, res) => {
  const { petName, petBreed, petAge, petSize, petColour, petLocation, petMedicalhistory, petGender } = req.body; 
  let mediaUrl = "";
  if (req.file && req.file.path) {
    mediaUrl = req.file.path;
  }

  const userId = req.user._id;
  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  try {
    const pet = new Pet({
      petName,
      petBreed,
      petAge,
      petSize,
      petColour,
      petLocation,
      media: mediaUrl,
      petMedicalhistory,
      petGender,
    });
    await pet.save();
    res.status(200).json({ message: "Pet created successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getPets = async (req, res) => {
  const { breed, age, size, location } = req.query;
  let query = {};
  if (breed) query.petBreed = breed;
  if (age) query.petAge = age;
  if (size) query.petSize = size;
  if (location) query.petLocation = location;

  try {
    const pets = await Pet.find(query);
    res.status(200).json(pets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// New function to get a single pet by ID
export const getPetById = async (req, res) => {
  const { id } = req.params;
  try {
    const pet = await Pet.findById(id);
    if (!pet) {
      return res.status(404).json({ message: "Pet not found" });
    }
    res.status(200).json(pet);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deletePet = async (req, res) => {
  const { id } = req.params;
  try {
    const pet = await Pet.findByIdAndDelete(id);
    if (!pet) {
      return res.status(404).json({ message: "Pet not found" });
    }
    res.status(200).json({ message: "Pet deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const editPet = async (req, res) => {
  const { id } = req.params;
  const { petName, petBreed, petAge, petSize, petColour, petLocation, petMedicalhistory, petGender } = req.body;
  try {
    const pet = await Pet.findById(id);
    if (!pet) {
      return res.status(404).json({ message: "Pet not found" });
    }
    pet.petName = petName;
    pet.petBreed = petBreed;
    pet.petAge = petAge;
    pet.petSize = petSize;
    pet.petColour = petColour;
    pet.petLocation = petLocation;
    pet.petMedicalhistory = petMedicalhistory;
    pet.petGender = petGender;

    if (req.file && req.file.path) {
      pet.media = req.file.path;
    }

    await pet.save();
    res.status(200).json({ message: "Pet updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
