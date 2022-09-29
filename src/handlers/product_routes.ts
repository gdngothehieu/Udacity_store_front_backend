import express, { Request, Response } from "express";
import { Product, ProductsStore } from "../models/product";
import verifyAuthToken from "../middlewares/authorization";

const store = new ProductsStore();

const index = async (_req: Request, res: Response) => {
  try {
    const products = await store.index();
    res.json(products);
  } catch (err) {
    res.status(400).json(err);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const product = await store.show(parseInt(req.params.id));
    res.json(product);
  } catch (err) {
    res.status(400).json(err);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const product: Product = {
      name: req.body.name,
      price: req.body.price,
      category: req.body.category,
    };
    const newProduct = await store.create(product);
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const SortByCategory = async (_req: Request, res: Response) => {
  try {
    const products = await store.ByCategory();
    res.json(products);
  } catch (err) {
    res.status(400).json(err);
  }
};

const productRoutes = (app: express.Application) => {
  app.get("/products", index);
  app.get("/products/:id", show);
  app.post("/products", verifyAuthToken, create);
  app.post("/products/by-category", SortByCategory);
};

export default productRoutes;
