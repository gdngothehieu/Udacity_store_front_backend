import express, { Request, Response } from "express";
import { Order, OrdersStore } from "../models/order";
import verifyAuthToken from "../middlewares/authorization";

const store = new OrdersStore();

const index = async (req: Request, res: Response) => {
  try {
    const orders = await store.index();
    res.json(orders);
  } catch (err) {
    res.status(400).json(err);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const order = await store.show(parseInt(req.params.id));
    res.json(order);
  } catch (err) {
    res.status(400).json(err);
  }
};

const create = async (req: Request, res: Response) => {
  const order: Order = {
    productId: req.body.productid,
    quantity: req.body.quantity,
    userId: req.body.userid,
    status: req.body.status,
  };
  try {
    const newOrder = await store.create(order);
    res.status(201).json(newOrder);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const currentByUser = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userid);
    const order = await store.currentByUser(userId);
    res.json(order);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const completeByUser = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userid);
    const order = await store.completeByUser(userId);
    res.json(order);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const AddProductToOrder = async (req: Request, res: Response) => {
  const orderId = parseInt(req.params.id);
  const productId = req.body.product_id;
  const Quantity = req.body.quantity;
  try {
    const addedProduct = await store.AddProductToOrder(
      orderId,
      productId,
      Quantity
    );
    res.status(201).json(addedProduct);
  } catch (err) {
    res.status(400).json(err);
  }
};

const GetOrdersById = async (req: Request, res: Response) => {
  const orderId = parseInt(req.params.id);
  try {
    const orders = await store.GetOrdersById(orderId);
    res.json(orders);
  } catch (err) {
    res.status(400).json(err);
  }
};

const orderRoutes = (app: express.Application) => {
  app.get("/orders", verifyAuthToken, index);
  // Get order by its id
  app.get("/orders/:id", verifyAuthToken, show);
  app.post("/orders", verifyAuthToken, create);
  app.get("/orders/current-by-user/:userid", verifyAuthToken, currentByUser);
  app.get("/orders/complete-by-user/:userid", verifyAuthToken, completeByUser);
  app.post("/orders/:id/products", verifyAuthToken, AddProductToOrder);
  // Get orders by order_id foreign key
  app.get("/orders/by_order_id/:id", verifyAuthToken, GetOrdersById);
};

export default orderRoutes;
