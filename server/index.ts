import express, { Request, Response } from "express";
import next from "next";

import { loadControllers, scopePerRequest } from "awilix-express";
import container from "./container";

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const port = process.env.PORT || 3000;


(async () => {
  try {
    await app.prepare();

    const server = express();

    server.use(scopePerRequest(container))
    server.use(loadControllers('./controllers/*.ts', { cwd: __dirname }))

    server.get('/product/:id', (req: Request, res: Response) => {
      console.log('/product/:id', req.params)
      // @ts-ignore
      return app.render(req, res, '/product/[id]', { id: req.params.id })
    })

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
