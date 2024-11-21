import nodemailer from 'nodemailer';
import User from '../Models/userSchema.js';
import Pet from '../Models/petSchema.js';

// Send adoption request email
export const sendAdoptionRequest = async (req, res) => {
  const { petId, userName, userEmail, petDetails } = req.body;

  try {
    const shelter = await User.findById(petDetails.shelterId);

    if (!shelter) {
      return res.status(404).json({ message: 'Shelter not found.' });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'your-email@gmail.com',
        pass: 'your-email-password',
      },
    });

    const mailOptions = {
      from: 'your-email@gmail.com',
      to: shelter.email,
      subject: 'Adoption Request',
      text: `An adoption request has been made by ${userName} (${userEmail}) for the pet ${petDetails.petName}.`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Adoption request sent successfully.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
