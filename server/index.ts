import express, { Request, Response } from "express";
import { parse } from "url";
import next from "next";

import apiRouter from "./routes/index";
import { loadControllers, scopePerRequest } from "awilix-express";
import { asValue, createContainer } from "awilix";

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const port = process.env.PORT || 3000;

import { users, products, categories, reviews } from './models';

const container = createContainer();
container.register({
  User: asValue(users),
  Product: asValue(products),
  Category: asValue(categories),
  Review: asValue(reviews),
});

(async () => {
  try {
    await app.prepare();

    const server = express();

    server.use(scopePerRequest(container))
    server.use(loadControllers('./controllers/*.ts', { cwd: __dirname }))


    // server.use("/api", apiRouter);

    // server.get('/product/:id', (req: Request, res: Response) => {
    //   console.log('/product/:id', req.params)
    //   // @ts-ignore
    //   return app.render(req, res, '/product/[id]', { id: req.params.id })
    // })

    // // server.get('/b', (req: Request, res: Response) => {
    // //   return app.render(req, res, '/b', req.body)
    // // })


    server.all("*", (req: Request, res: Response) => {
      return handle(req, res);
    });

    server.listen(port, (err?: any) => {
      if (err) throw err;
      console.warn(
        `> ★★★ALIVE★★★ Ready on localhost:${port} - env ${process.env.NODE_ENV}`
      );
    });
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();
