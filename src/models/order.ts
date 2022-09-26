import Client from "../database";

export type Order = {
  id?: number;
  productId: number;
  quantity: number;
  userId: number;
  status: string;
};

export class OrdersStore {
  async Index(): Promise<Order[]> {
    try {
      const connect = await Client.connect();
      const sql = "SELECT * FROM orders";
      const result = await connect.query(sql);
      connect.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Could not get any orders. Error: ${err}`);
    }
  }

  async Show(id: number): Promise<Order> {
    try {
      const connect = await Client.connect();
      const sql = "SELECT * FROM orders WHERE id=($1)";
      const result = await connect.query(sql, [id]);
      connect.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find order ${id}. Error: ${err}`);
    }
  }

  async Create(o: Order): Promise<Order> {
    try {
      const connect = await Client.connect();
      const sql =
        "INSERT INTO orders (product_id, quantity, user_id, status) VALUES ($1, $2, $3, $4) RETURNING *";
      const result = await connect.query(sql, [
        o.productId,
        o.quantity,
        o.userId,
        o.status,
      ]);
      connect.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not add new order ${o.id}. Error: ${err}`);
    }
  }

  async CurrentByUser(userId: number): Promise<Order> {
    try {
      const connect = await Client.connect();
      const sql =
        "SELECT * FROM orders WHERE user_id=($1) AND status = 'active'";
      const result = await connect.query(sql, [userId]);
      connect.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Could not find current order by user ${userId}. Error: ${err}`
      );
    }
  }

  async CompleteByUser(userId: number): Promise<Order[]> {
    try {
      const connect = await Client.connect();
      const sql =
        "SELECT * FROM orders WHERE user_id=($1) AND status = 'complete'";
      const result = await connect.query(sql, [userId]);
      connect.release();
      return result.rows;
    } catch (err) {
      throw new Error(
        `Could not find complete orders by user ${userId}. Error: ${err}`
      );
    }
  }

  async AddProductToOrder(
    orderId: number,
    productId: number,
    quantity: number
  ): Promise<{
    id?: number;
    order_id: number;
    product_id: number;
    quantity: number;
  }> {
    try {
      const connect = await Client.connect();
      const sql =
        "INSERT INTO order_products (order_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *";
      const result = await connect.query(sql, [orderId, productId, quantity]);
      connect.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Could not add product ${productId} to order ${orderId}. Error: ${err}`
      );
    }
  }

  async GetOrdersById(
    orderId: number
  ): Promise<
    {
      id?: number;
      order_id: number;
      product_id: number;
      quantity: number;
    }[]
  > {
    try {
      const connect = await Client.connect();
      const sql = "SELECT * FROM order_products WHERE order_id=($1)";
      const result = await connect.query(sql, [orderId]);
      connect.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Could not get orders by ${orderId}. Error: ${err}`);
    }
  }
}
