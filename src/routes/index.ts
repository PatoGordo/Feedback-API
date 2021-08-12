import { Router } from "express";
import { StarRatingRouter } from "./StarRatingRouter";

const routes = Router();

routes.use(StarRatingRouter);

routes.get("/", (req, res) => {
  return res.status(200).send(`welcome to /`);
});

export { routes };
