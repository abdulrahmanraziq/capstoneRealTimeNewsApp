import { mongoose } from "./index.js";

const subscriptionSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "email is required"],
    },

    topic: {
      type: String,
      enum: {
        values: [
          "Latest Breaking News",
          "Politics",
          "Business",
          "Sports",
          "Entertainment",
          "Education",
        ],
        message: "{VALUE} is not supported",
      },
    },
    count: {
      type: Number,
      default: 0,
    },

    subscribed: {
        type: Boolean,
        default: false,
    },

    subscribedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: "subscription",
    versionKey: false,
  }
);

const subscription = new mongoose.model("subscription", subscriptionSchema);

export default subscription;
