import express, { Request, Response } from "express";
import { parse } from 'url'
import next from "next"; 

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const port = process.env.PORT || 3000;

(async () => {
  try {
    await app.prepare();
    
    const server = express();
    
    server.get('/a', (req: Request, res: Response) => {
      return app.render(req, res, '/a', req.body)
    })

    server.get('/b', (req: Request, res: Response) => {
      return app.render(req, res, '/b', req.body)
    })

     server.all("*", (req: Request, res: Response) => {
      return handle(req, res);
    });

    server.listen(port, (err?: any) => {
      if (err) throw err;
      console.log(`> Ready on localhost:${port} - env ${process.env.NODE_ENV}`);
    });
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();