import supertest from "supertest";
import app from "../../server";

const request = supertest(app);

export let token: string;
describe("Testing User Routes", () => {
  it("Should successfully create new user with status 201", async (done: (
    err?: unknown
  ) => void) => {
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

  it("1.2 Should show user by his/her id", (done: (err?: unknown) => void) => {
    request
      .get("/users/1")
      .set("Authorization", `Bearer ${token}`)
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => {
        done();
      })
      .catch((error) => done(error));
  });

  it("1.3 Should show all Users", (done: (err?: unknown) => void) => {
    request
      .get("/users")
      .set("Authorization", `Bearer ${token}`)
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => {
        console.log(res.body);
        done();
      })
      .catch((error) => done(error));
  });
});
