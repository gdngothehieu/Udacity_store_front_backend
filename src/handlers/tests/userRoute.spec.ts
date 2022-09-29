import supertest from "supertest";
import app from "../../server";

const request = supertest(app);

export let token: string;
describe("Testing User Routes", () => {
  it("Should successfully create new user with status 201", async () => {
    try {
      const user = {
        firstName: "Hieu",
        lastName: "Ngo",
        input_password: parseInt("chosoi12"),
      };
      let usersResponse = await request
        .post("/users")
        .send(user)
        .set("Accept", "application/json")
        .expect(201);
      token = usersResponse.body;
    } catch (e) {
      console.log(e);
    }
  });

  it("Should show user by his/her id", async () => {
    try {
      const response = await request
        .get("/users/1")
        .set("Authorization", `Bearer ${token}`)
        .expect("Content-Type", /json/)
        .expect(200);
    } catch (e) {
      console.log(e);
    }
  });

  it("Should show all Users", async () => {
    try {
      const response = await request
        .get("/users")
        .set("Authorization", `Bearer ${token}`)
        .expect(200);
    } catch (e) {
      console.log(e);
    }
  });
});
