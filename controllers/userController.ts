import { Request, Response } from "express";
import { UserModel, IUser } from "../models/user.model";
import { HobbyModel, IHobby } from "../models/hoby_model";
import { ObjectId } from "mongoose";
import mongoose from "mongoose";
export class UserController {
  public async getAllUsers(req: Request, res: Response) {
    try {
      // Retrieve all users from the database
      const users: IUser[] = await UserModel.find();

      return res.status(200).json(users); // Return the list of users
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  public async createUser(req: Request, res: Response) {
    try {
      const newUser: IUser = new UserModel({
        name: req.body.name,
      });

      // Save the new user to the database
      const savedUser: IUser = await newUser.save();

      return res.status(201).json(savedUser); // Return the saved user data
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  public async createHobby(req: Request, res: Response) {
    try {
      const userId: string = req.body.userId; // Adjust the route accordingl
      // Find the user by their ID
      const user = await UserModel.findById(userId);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Create a new hobby document
      const newHobby = new HobbyModel({
        passionLevel: req.body.passionLevel,
        name: req.body.name,
        year: req.body.year,
      });

      // Save the hobby to the database
      await newHobby.save();

      // Associate the hobby with the user
      user!.hobbies.push(newHobby._id);

      // Save the updated user
      await user!.save();

      return res
        .status(201)
        .json({ message: "Hobby created and associated with the user" });
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  public async getUserWithHobbies(req: Request, res: Response) {
    try {
      const userId: string = req.params.userId;

      // Find the user by their ID and populate the 'hobbies' fieldcreate
      const user = await UserModel.findById(userId).populate({
        path: "hobbies",
        model: "Hobby",
      });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // The 'hobbies' field will now contain the associated hobby documents

      return res.status(200).json({ user });
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  public async deleteHobby(req: Request, res: Response) {
    const userId: string = req.params.userId;
    const hobbyId: string = req.params.hobbyId;

    try {
      // Check if the user exists
      const user = await UserModel.findById(userId);
      const hobby = await HobbyModel.findById(hobbyId);

      console.log(user);

      console.log(hobby);

      if (!user || !hobby) {
        return res.status(404).json({ message: "User or hobby  not found" });
      }

      const delhobby = await HobbyModel.deleteOne({ _id: hobbyId });

      // Remove the hobby ID from the user's hobbies list using the $pull operator
      const result = await UserModel.updateOne(
        { _id: userId },
        { $pull: { hobbies: hobbyId } }
      );

      if (result.matchedCount === 0) {
        return res
          .status(404)
          .json({ message: "Hobby not associated with the user" });
      }

      return res.status(200).json({ message: "Hobby deleted successfully" });
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
}
