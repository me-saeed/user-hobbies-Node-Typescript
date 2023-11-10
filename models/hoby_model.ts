import { Schema, model, Document } from "mongoose";

interface IHobby extends Document {
  passionLevel: string;
  name: string;
  year: string;
}

const hobbySchema = new Schema<IHobby>({
  passionLevel: {
    type: String,
    required: true,
    enum: ["Low", "Medium", "High", "Very-High"],
  },
  name: { type: String, required: true },
  year: { type: String, required: true },
});

const HobbyModel = model<IHobby>("Hobby", hobbySchema);

export { HobbyModel, IHobby };
