import { User, UsersStore } from "../user";

const store = new UsersStore();

describe("Test User Model", () => {
  it("Should create new user", async () => {
    const response = await store.show(1);
    expect(response.first_name).toBeDefined();
  });

  it("Should show user by his/her id", async () => {
    const result = await store.show(1);
    expect(result.last_name).toBeDefined();
  });

  it("Should show all Users", async () => {
    const result = await store.index();
    expect(result.length).toBeGreaterThan(0);
  });
});
