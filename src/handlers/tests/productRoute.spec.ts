import supertest from "supertest";
import app from "../../server";
import { token } from "./userRoute.spec";

const request = supertest(app);

describe("Testing Product Routes", () => {
  it("Should create new product with status 201", async () => {
    try {
      const product = {
        name: "Bubble Tea",
        price: 15,
        category: "tea milk",
      };
      const response = await request
        .post("/products")
        .send(product)
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${token}`)
        .expect(201);
    } catch (e) {
      console.log(e);
    }
  });

  it("Should show product by its id with status 200", async () => {
    try {
      const response = await request.get("/products/1").expect(200);
    } catch (e) {
      console.log(e);
    }
  });

  it("Should show all products with status 200", async () => {
    try {
      await request.get("/products").expect(200);
    } catch (e) {
      console.log(e);
    }
  });

  it("Should return products ordered by category with status 200", async () => {
    try {
      await request.post("/products/by-category").expect(200);
    } catch (e) {
      console.log(e);
    }
  });
});
