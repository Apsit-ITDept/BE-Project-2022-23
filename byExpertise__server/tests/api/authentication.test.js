const request = require("supertest");
const app = require("../../index");

describe("Testing Sign up and Sign in APIs", () => {
  it("should sign up a user", async (done) => {
    const payload = {
      fname: "Test",
      lname: "Test",
      email: "test@test.com",
      password: "TestPassword",
    };
    request(app)
      .post("/api/user/")
      .send(payload)
      .set("Content-type", "application/json")
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toEqual("Sign Up successful");
        // done to wait for expects to be finished
        done();
      });
  });
  it("should not sign up a user", async (done) => {
    const payload = {
      fname: "Test",
      lname: "Test",
      email: "test@test.com", //same email
      password: "TestPassword",
    };
    request(app)
      .post("/api/user/")
      .send(payload)
      .set("Content-type", "application/json")
      .then((response) => {
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toEqual("Email already in use.");
        // done to wait for expects to be finished
        done();
      });
  });
  it("should not sign in a user", async (done) => {
    const payload = {
      email: "test@invalid.com", //invalid email
      password: "TestPassword",
    };
    request(app)
      .post("/api/auth/")
      .send(payload)
      .set("Content-type", "application/json")
      .then((response) => {
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toEqual("Email or Password is Invalid");
        // done to wait for expects to be finished
        done();
      });
  });

  it("should sign in a user", async (done) => {
    const payload = {
      email: "test@test.com",
      password: "TestPassword",
    };
    request(app)
      .post("/api/auth/")
      .send(payload)
      .set("Content-type", "application/json")
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toEqual("Sign In successful");
        // done to wait for expects to be finished
        done();
      });
  });

  it("should delete all test users for up", async (done) => {
    request(app)
      .delete("/api/user/test")
      .set("Content-type", "application/json")
      .then((response) => {
        expect(response.statusCode).toBe(200);
        // done to wait for expects to be finished
        done();
      });
  });
});
