import Review from '../Models/reviewSchema.js';
import Pet from '../Models/petSchema.js';
import User from '../Models/userSchema.js';



export const createReview = async (req, res) => {
  const { rating, comment } = req.body;
  const { petId } = req.params;
  const userId = req.user._id;

  try {
    const pet = await Pet.findById(petId);
    if (!pet) {
      return res.status(404).json({ message: 'Pet not found' });
    }

    const review = new Review({
      user: userId,
      pet: petId,
      rating,
      comment,
    });

    await review.save();
    res.status(201).json({ message: 'Review created successfully', review });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getReviews = async (req, res) => {
  try {
    const { petId } = req.query;
    let filter = {};

    if (petId) filter.pet = petId;

    const reviews = await Review.find(filter)
      .populate('user', 'name')
      .populate('pet', 'petName');

    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const reportReview = async (req, res) => {
  const { id } = req.params;

  try {
    const review = await Review.findById(id);
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    review.reported = true;
    await review.save();

    res.status(200).json({ message: 'Review reported successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
