import { mongoose } from "./index.js";

const newsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "title is required"],
    },

    description: {
      type: String,
      required: [true, "description is required"],
    },

    image: {
      type: String,
      required: [true, "image is required"],
    },
    topic: {
      type: String,
      required: [true, "topic is required"],
    },
    source: {
      type: String,
      required: [true, "source is required"],
    },
    status: {
      type: Boolean,
      default: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: "news",
    versionKey: false,
  }
);

const newsData = new mongoose.model("news", newsSchema);

export default newsData;
