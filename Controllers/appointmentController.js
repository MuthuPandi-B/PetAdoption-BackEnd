import Appointment from '../Models/appointmentSchema.js';
import Pet from '../Models/petSchema.js';
import User from '../Models/userSchema.js';

export const createAppointment = async (req, res) => {
  const { petId, date } = req.body;
  const adopterId = req.user._id;
  const shelterId = req.body.shelterId;

  try {
    const pet = await Pet.findById(petId);
    if (!pet) {
      return res.status(404).json({ message: 'Pet not found' });
    }

    const shelter = await User.findById(shelterId);
    if (!shelter) {
      return res.status(404).json({ message: 'Shelter not found' });
    }

    const appointment = new Appointment({
      adopter: adopterId,
      shelter: shelterId,
      pet: petId,
      date
    });

    await appointment.save();
    res.status(201).json({ message: 'Appointment created successfully', appointment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAppointments = async (req, res) => {
  const userId = req.user._id;

  try {
    const appointments = await Appointment.find({ $or: [{ adopter: userId }, { shelter: userId }] })
      .populate('adopter', 'name')
      .populate('shelter', 'name')
      .populate('pet', 'petName')
      .sort({ date: -1 });

    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
