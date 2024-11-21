import FosterPet from '../Models/fosterPetSchema.js';
// Create Foster Pet
export const createFosterPet = async (req, res) => {
  const { name, breed, age, medicalHistory } = req.body;
  const shelterId = req.user._id; // The authenticated user's ID who is a shelter

  try {
    const newFosterPet = new FosterPet({
      name,
      breed,
      age,
      medicalHistory,
      shelter: shelterId, // Assign the authenticated user's ID as the shelter ID
    });
    await newFosterPet.save();
    res.status(201).json({ message: 'Foster pet created successfully', fosterPet: newFosterPet });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Get Foster Pets by Shelter
export const getFosterPetsByShelter = async (req, res) => {
  const { shelterId } = req.params;
  try {
    const fosterPets = await FosterPet.find({ shelter: shelterId }).populate('fosterParent', 'name email');
    res.status(200).json(fosterPets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Foster Pet by ID
export const getFosterPetById = async (req, res) => {
  const { id } = req.params;
  try {
    const fosterPet = await FosterPet.findById(id).populate('fosterParent', 'name email');
    if (!fosterPet) {
      return res.status(404).json({ message: 'Foster pet not found' });
    }
    res.status(200).json(fosterPet);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Foster Pet Status
export const updateFosterPetStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const fosterPet = await FosterPet.findById(id);
    if (!fosterPet) {
      return res.status(404).json({ message: 'Foster pet not found' });
    }
    fosterPet.status = status;
    await fosterPet.save();
    res.status(200).json({ message: 'Foster pet status updated successfully', fosterPet });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Assign Foster Parent
export const assignFosterParent = async (req, res) => {
  const { id } = req.params;
  const { fosterParentId } = req.body;
  try {
    const fosterPet = await FosterPet.findById(id);
    if (!fosterPet) {
      return res.status(404).json({ message: 'Foster pet not found' });
    }
    fosterPet.fosterParent = fosterParentId;
    fosterPet.status = 'In Foster Care';
    await fosterPet.save();
    res.status(200).json({ message: 'Foster parent assigned successfully', fosterPet });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
