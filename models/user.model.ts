import { Schema, model, Document } from "mongoose";

interface IUser extends Document {
  name: string;
  hobbies: [{ type: Schema.Types.ObjectId; ref: "Hobby" }];
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  hobbies: [{ type: Schema.Types.ObjectId, ref: "Hobby" }],
});

const UserModel = model<IUser>("User", userSchema);

export { UserModel, IUser };
