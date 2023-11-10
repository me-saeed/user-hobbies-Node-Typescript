import supertest from "supertest";

import { UserModel } from "../models/user.model";
import { HobbyModel } from "../models/hoby_model";

import { app } from "../index";

describe("UserController", () => {
  test("should get all users", async () => {
    const response = await supertest(app).get("/api/users/getusers");
    expect(response.status).toBe(200);
  });

  test("should create a new hobby and associate it with the user", async () => {
    const createUserResponse = await supertest(app)
      .post("/api/users/createUser")
      .send({ name: "MockUser" });

    const userId = createUserResponse.body._id;

    const response = await supertest(app).post("/api/users/createHobby").send({
      userId,
      passionLevel: "High",
      name: "Programming",
      year: "2022",
    });

    expect(response.status).toBe(201);
  });

  test("should get user with hobbies", async () => {
    const createUserResponse = await supertest(app)
      .post("/api/users/createUser")
      .send({ name: "MockUser" });

    const userId = createUserResponse.body._id;

    await supertest(app).post("/api/users/createHobby").send({
      userId,
      passionLevel: "High",
      name: "Programming",
      year: "2022",
    });

    const response = await supertest(app).get(
      `/api/users/getUserWithHobbies/${userId}`
    );

    expect(response.status).toBe(200);
    expect(response.body.user._id).toBe(userId);
    expect(response.body.user.hobbies).toHaveLength(1);
  });

  test("should create a new user", async () => {
    const response = await supertest(app)
      .post("/api/users/createUser")
      .send({ name: "MockUser" });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("_id");
    expect(response.body.name).toBe("MockUser");
  });

  test("should delete a hobby associated with the user", async () => {
    const mockUser = new UserModel({
      name: "MockUser",
    });
    const savedUser = await mockUser.save();

    const mockHobby = new HobbyModel({
      passionLevel: "High",
      name: "Programming",
      year: "2022",
    });
    const savedHobby = await mockHobby.save();

    savedUser.hobbies.push(savedHobby._id);
    await savedUser.save();

    const response = await supertest(app).delete(
      `/api/users/deleteHobby/${savedUser._id}/${savedHobby._id}`
    );

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty(
      "message",
      "Hobby deleted successfully"
    );
  });
});
