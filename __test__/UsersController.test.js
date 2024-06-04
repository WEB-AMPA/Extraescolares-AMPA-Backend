import request from "supertest";
import server from "../app.js";
import UserModel from "../models/UsersModel.js";
import db from "../database/db.js";
import { startServer } from "../server.js";

let server1;
let newUserId = "";
let createdUserId;
let newUser = {
  username: "Test User " + Date.now(),
  email: "testuser@example.com",
  role: "Test Role",
  lastname: "Test Lastname",
  name: "Test Name",
};

beforeAll(async () => {
  try {
    server1 = startServer();
    const user = await UserModel.create(newUser);
    if (user) {
      newUserId = user._id;
    } else {
      console.error("Failed to create test user");
    }
  } catch (error) {
    console.error("Error setting up test data: ", error);
  }
});

describe("GET users", () => {
  test("should return status code 200 when users has been called", async () => {
    const response = await request(server).get("/users");
    expect(response.status).toBe(200);
  });
  test("should return status code 404 when route does not exist", async () => {
    const response = await request(server).get("/test");
    expect(response.status).toBe(404);
  });
  test("should return status code 200 when one single user has been called", async () => {
    const response = await request(server).get(`/users/${newUserId}`);
    expect(response.status).toBe(200);
  });
  test("should return status code 404 when one single user has been called and it does not exist", async () => {
    const response = await request(server).get("/users/1232");
    expect(response.status).toBe(404);
  });
});

describe("POST users", () => {
  const newUserMalformed = {
    username: "",
    email: "",
  };
  const newUser = {
    username: "Test User POST " + Date.now(),
    email: "testuserpost@example.com",
    role: "Test Role POST",
    lastname: "Test Lastname POST",
    name: "Test Name POST",
  };
  test("should return status code 201 when one user has been created", async () => {
    const response = await request(server)
      .post("/users")
      .send(newUser);
    expect(response.status).toBe(201);
    createdUserId = response.body._id;
  });

  test("should return status code 400 when username or email is malformed", async () => {
    const response = await request(server)
      .post("/users")
      .send(newUserMalformed);
    expect(response.status).toBe(400);
  });
});

afterAll(async () => {
  try {
    await UserModel.findByIdAndDelete(newUserId);
    if (createdUserId) {
      await UserModel.findByIdAndDelete(createdUserId);
    }
  } catch (error) {
    console.error("Error cleaning up test data: ", error);
  }
  await db.close();
});

afterAll((done) => {
  server1.close(done);
});