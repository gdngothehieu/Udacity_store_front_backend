import { Product, ProductsStore } from "../product";

const store = new ProductsStore();

describe("Test Product Model", () => {
  it("Should create new product", async () => {
    const response = await store.show(1);
    expect(response.name).toEqual("Teama_Milk");
  });

  it("Should show product by its id", async () => {
    const result = await store.show(1);
    expect(result.price).toEqual(10);
  });

  it("Should show all Products", async () => {
    const result = await store.index();
    expect(result.length).toBeGreaterThan(0);
  });

  it("Should return products ordered by category", async () => {
    const result = await store.ByCategory();
    expect(result[0].category).toEqual("cheese");
  });
});
