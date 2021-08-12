import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import { routes } from "./routes";

class App {
  public app: express.Application;
  private uri: string;

  public constructor() {
    this.app = express();
    this.uri =
      "mongodb+srv://DuckSurveys:6qGh7DzPeDk1uJKQ@patogordo.4g2iz.mongodb.net/DuckSurveys?retryWrites=true&w=majority" ||
      (process.env.URI as string);

    this.middlewares();
    this.database();
    this.routes();
  }

  private middlewares() {
    this.app.use(express.json());
    this.app.use(cors());
  }

  private database(): void {
    mongoose.connect(this.uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
  }

  private routes(): void {
    this.app.use(routes);
  }
}

export default new App().app;
