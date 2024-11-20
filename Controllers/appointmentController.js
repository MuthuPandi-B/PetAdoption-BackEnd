import Appointment from "../Models/appointmentSchema.js";

// Schedule Appointment
export const scheduleAppointment = async (req, res) => {
  const { date, time, message, petId } = req.body;
  const userId = req.user._id; // Get user ID from authenticated user

  try {
    const newAppointment = new Appointment({ date, time, message, user: userId, pet: petId });
    await newAppointment.save();
    res.status(200).json({ message: "Appointment scheduled successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Appointments by User
export const getAppointmentsByUser = async (req, res) => {
  const userId = req.user._id;

  try {
    const appointments = await Appointment.find({ user: userId }).populate("pet");
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All Appointments for Admin
export const getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find().populate("pet user");
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
