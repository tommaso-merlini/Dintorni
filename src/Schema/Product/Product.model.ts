const mongoose = require("mongoose");

mongoose.set("useCreateIndex", true);

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  images: [{ type: String, required: true }],
  description: { type: String, required: false },
  shopName: { type: String, required: true },
  likes: { type: Number, required: true },
  location: {
    type: {
      type: String,
      required: true,
    },
    coordinates: [{ type: Number, required: true }],
  },
  status: { type: String, required: true },
  shopID: { type: mongoose.Types.ObjectId, required: true },
});

ProductSchema.index({
  name: "search",

  mappings: {
    dynamic: false,
    fields: {
      location: {
        type: "geo",
      },
      name: {
        type: "string",
        analyzer: "lucene.italian",
      },
    },
  },
});

const Product = mongoose.model("product", ProductSchema);
export default Product;
