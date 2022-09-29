import express from "express";
import bodyParser from "body-parser";
import userRoutes from "./handlers/user_routes";
import productRoutes from "./handlers/product_routes";
import orderRoutes from "./handlers/order_routes";

const app: express.Application = express();
const address: string = "0.0.0.0:3000";

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

userRoutes(app);
productRoutes(app);
orderRoutes(app);

app.listen(3000, () => {
  console.log(`Starting app on: ${address}`);
});

export default app;
