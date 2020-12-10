const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A Tour must have a name.'],
      unique: true,
      trim: true,
    },
    rating: {
      type: Number,
      default: 4.5,
    },
    duration: {
      type: Number,
      required: [true, 'A Tour must have a Duration.'],
    },
    maxGroupSize: {
      type: Number,
      required: [true, 'A Tour must have a Group Size.'],
    },
    difficulty: {
      type: String,
      required: [true, 'A Tour must have a difficulty.'],
    },
    ratingAverage: {
      type: Number,
      default: 4.5,
    },
    ratingQuantity: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, 'A tour must have a price.'],
    },
    priceDiscount: Number,
    summary: {
      type: String,
      trim: true,
      required: [true, 'A tour must have a Summay.'],
    },
    description: {
      type: String,
      trim: true,
    },
    imageCover: {
      type: String,
      required: [true, 'A tour must have a Cover Image.'],
    },
    images: [String],
    createAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
    startDates: [Date],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

tourSchema.virtual('durationWeeks').get(function () {
  return this.duration / 7;
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
