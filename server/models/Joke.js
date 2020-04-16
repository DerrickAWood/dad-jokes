import mongoose from "mongoose";
const Schema = mongoose.Schema;

const Joke = new Schema(
  {
    setup: { type: String, required: true },
    punchline: { type: String, required: true },
    creatorEmail: { type: String, required: true }
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

Joke.virtual("creator", {
  localField: "creatorEmail",
  ref: "Profile",
  foreignField: "email",
  justOne: true
});

export default Joke;
