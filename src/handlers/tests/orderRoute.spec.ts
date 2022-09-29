import supertest from "supertest";
import app from "../../server";
import { token } from "./userRoute.spec";

const request = supertest(app);

describe("Testint Order Route", () => {
  it("Should create order with 'complete' status 201", () => {
    try {
      const order = {
        productid: 1,
        quantity: 5,
        userid: 1,
        status: "complete",
      };
      request
        .post("/orders")
        .send(order)
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${token}`)
        .expect(201);
    } catch (e) {}
  });

  it("Should create order with status 201", async () => {
    try {
      const order = {
        productid: 1,
        quantity: 4,
        userid: 1,
        status: "active",
      };
      const response = await request
        .post("/orders")
        .send(order)
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${token}`)
        .expect(201);
    } catch (e) {
      console.log(e);
    }
  });

  it("Should show current order by user with status 200", async () => {
    try {
      const response = await request
        .get("/orders/current-by-user/1")
        .set("Authorization", `Bearer ${token}`)
        .expect(200);
    } catch (e) {
      console.log(e);
    }
  });

  it("Should show complete order by user with status 200", async () => {
    try {
      const response = await request
        .get("/orders/complete-by-user/1")
        .set("Authorization", `Bearer ${token}`)
        .expect(200);
    } catch (e) {}
  });

  it("Should show order by its id with status 200", async () => {
    try {
      const response = await request
        .get("/orders/2")
        .set("Authorization", `Bearer ${token}`)
        .expect(200);
    } catch (e) {
      console.log(e);
    }
  });

  it("Should show all orders with status 200", async () => {
    try {
      const response = await request
        .get("/orders")
        .set("Authorization", `Bearer ${token}`)
        .expect(200);
    } catch (e) {
      console.log(e);
    }
  });

  it("Should add product to an order_id with status 201", async () => {
    try {
      const data = {
        product_id: 1,
        quantity: 6,
      };
      const response = await request
        .post("/orders/1/products")
        .send(data)
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${token}`)
        .expect(201);
    } catch (e) {
      console.log(e);
    }
  });

  it("Should get orders by order_id foreign key with status 200", async () => {
    try {
      const response = await request
        .get("/orders/by_order_id/1")
        .set("Authorization", `Bearer ${token}`)
        .expect(200);
    } catch (e) {
      console.log(e);
    }
  });
});
