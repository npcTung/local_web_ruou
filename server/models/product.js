const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    description: {
      type: Array,
      required: true,
    },
    brand: String,
    thumb: { type: String, required: true },
    fileNameThumb: String,
    price: { type: String, required: true },
    category: { type: String, required: true },
    quantity: { type: Number, default: 0 },
    sold: { type: Number, default: 0 },
    images: Array,
    fileNameImages: Array,
    color: { type: String, default: "black" },
    ratings: [
      {
        star: Number,
        posteBy: { type: mongoose.Types.ObjectId, ref: "User" },
        comment: String,
        updateAt: Date,
      },
    ],
    totalRatings: { type: Number, default: 0 },
    varriantis: [
      {
        color: String,
        price: String,
        thumb: String,
        fileNameThumb: String,
        images: Array,
        fileNameImages: Array,
        quantity: { type: Number, default: 0 },
        sold: { type: Number, default: 0 },
      },
    ],
  },
  { timestamps: true }
);

//Export the model
module.exports = mongoose.model("Product", productSchema);
