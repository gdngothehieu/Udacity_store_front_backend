import Client from "../database";
import bcrypt from "bcrypt";

const pepper = process.env.PEPPER;
const saltRounds = process.env.SALT_ROUNDS;

export type User = {
  id?: number;
  first_name: string;
  last_name: string;
  input_password: string;
};

export class UsersStore {
  async Index(): Promise<User[]> {
    try {
      const connect = await Client.connect();
      const sql = "SELECT * FROM users";
      const result = await connect.query(sql);
      connect.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Could not get any users. Error: ${err}`);
    }
  }

  async Show(id: number): Promise<User> {
    try {
      const connect = await Client.connect();
      const sql = "SELECT * FROM users WHERE id=($1)";
      const result = await connect.query(sql, [id]);
      connect.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find user ${id}. Error: ${err}`);
    }
  }

  async Create(u: User): Promise<User> {
    try {
      const connect = await Client.connect();
      const sql =
        "INSERT INTO users (first_name, last_name, password) VALUES ($1, $2, $3) RETURNING *";
      const hash = bcrypt.hashSync(
        u.input_password + pepper,
        parseInt(saltRounds as string)
      );
      const result = await connect.query(sql, [
        u.first_name,
        u.last_name,
        hash,
      ]);
      connect.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Could not add new user ${u.first_name} ${u.last_name}. Error: ${err}`
      );
    }
  }
}
