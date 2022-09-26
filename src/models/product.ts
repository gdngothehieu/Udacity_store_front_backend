import Client from "../database";

export type Product = {
  id?: number;
  name: string;
  price: number;
  category: string;
};

export class ProductsStore {
  async Index(): Promise<Product[]> {
    try {
      const connect = await Client.connect();
      const sql = "SELECT * FROM products";
      const result = await connect.query(sql);
      connect.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Could not get any products. Error: ${err}`);
    }
  }

  async Show(id: number): Promise<Product> {
    try {
      const connect = await Client.connect();
      const sql = "SELECT * FROM products WHERE id=($1)";
      const result = await connect.query(sql, [id]);
      connect.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find product ${id}. Error: ${err}`);
    }
  }

  async Create(p: Product): Promise<Product> {
    try {
      const connect = await Client.connect();
      const sql =
        "INSERT INTO products (name, price, category) VALUES ($1, $2, $3) RETURNING *";
      const result = await connect.query(sql, [p.name, p.price, p.category]);
      connect.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not add new product ${p.name}. Error: ${err}`);
    }
  }

  async ByCategory(): Promise<Product[]> {
    try {
      const connect = await Client.connect();
      const sql = "SELECT * FROM products ORDER BY category ASC";
      const result = await connect.query(sql);
      connect.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Could not get any products. Error: ${err}`);
    }
  }
}
