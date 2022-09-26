import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const {
  MY_HOST,
  MY_DB,
  MY_TEST_DB,
  MY_USER,
  MY_PASSWORD,
  MY_ENV,
} = process.env;

console.log(MY_ENV);

let Client: Pool;

if (MY_ENV === "test") {
  Client = new Pool({
    host: MY_HOST,
    database: MY_TEST_DB,
    user: MY_USER,
    password: MY_PASSWORD,
  });
} else {
  Client = new Pool({
    host: MY_HOST,
    database: MY_DB,
    user: MY_USER,
    password: MY_PASSWORD,
  });
}

export default Client;
