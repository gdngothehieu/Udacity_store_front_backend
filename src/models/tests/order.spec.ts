import { Order, OrdersStore } from "../order";

const store = new OrdersStore();

describe("Test Order Model", () => {
  it("Should create order with 'complete' status", async () => {
    const order: Order = {
      productId: 1,
      quantity: 5,
      userId: 1,
      status: "complete",
    };
    const result = await store.create(order);
    const response = await store.show(1);
    expect(response.quantity).toBeDefined();
  });

  it("Should create order with 'active' status", async () => {
    const order: Order = {
      productId: 1,
      quantity: 3,
      userId: 1,
      status: "active",
    };
    const result = await store.create(order);
    const response = await store.show(1);
    expect(response.status).toBeDefined();
  });

  it("Should show current order by user", async () => {
    const result = await store.currentByUser(1);
    expect(result.status).toEqual("active");
  });

  it("Should show complete order by user", async () => {
    const result = await store.completeByUser(1);
    expect(result[0].status).toEqual("complete");
  });

  it("Should show order by its id", async () => {
    const result = await store.show(1);
    expect(result.quantity).toBeDefined();
  });

  it("Should show all orders", async () => {
    const result = await store.index();
    expect(result.length).toBeGreaterThan(0);
  });

  it("Should add product to order that's active", async () => {
    const result = await store.currentByUser(1);
    const orderId = result.id;
    const productId = 1;
    const quantity = 7;
    const response = await store.AddProductToOrder(
      orderId as number,
      productId,
      quantity
    );
    expect(response).toBeDefined();
  });
});
