import express, { NextFunction, Request, Response } from "express";
import next from "next";
import bodyParser from 'body-parser';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import { loadControllers, scopePerRequest } from "awilix-express";
import { PassportStatic } from 'passport';
import container from "./container";
var cors = require('cors')

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const port = process.env.PORT || 3000;

const passport = container.resolve<PassportStatic>('passportCustom');

(async () => {
  try {
    await app.prepare();

    const server = express();

    //server.use(cors({ credentials: true, origin: 'localhost:3000' }));
    server.use(compression());
    server.use(cookieParser());
    server.use(bodyParser.json({ limit: '30mb' }));
    server.use(bodyParser.urlencoded({ limit: '30mb', extended: false, parameterLimit: 50000 }));

    server.use(passport.initialize())
    server.use(acl);

    server.use(scopePerRequest(container))
    server.use(loadControllers('./controllers/*.ts', { cwd: __dirname }))

    server.get('/product/:id', (req: Request, res: Response) => {
      console.log('/product/:id', req.params)
      // @ts-ignore
      return app.render(req, res, '/product/[id]', { id: req.params.id })
    })

    server.get('/login', (req: Request, res: Response) => {
      console.log('/login', req.params)
      // @ts-ignore
      return app.render(req, res, '/login')
    })

    server.all("*", (req: Request, res: Response) => {
      return handle(req, res);
    });

    server.listen(port, (err?: any) => {
      if (err) throw err;
      console.warn(
        `> ★★★_A_L_I_V_E_★★★ Ready on localhost:${port} - env ${process.env.NODE_ENV}`
      );
    });


  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();


const acl = (req: Request, res: Response, next: NextFunction) => {
  let useAcl = true
  const url = req.url
  for (const item of IGNORS) {
    if (url.startsWith(item)) {
      useAcl = false
    }
  }

  if (useAcl) {
    const jwt = passport.authenticate('local-jwt', (err, identity) => {
      const isLogged = identity && identity.userId;
      if (!isLogged) {
        const isAPICall = req.path.toLowerCase().includes('api')
        if (isAPICall) {
          return res.status(401).send({
            data: null,
            message: 'You are not authorized to open this page',
            error: true,
          })
        } else {
          //return res.redirect('/');
          return handle(req, res);
        }
      }
      //req.identity = identity;
      next()
    });
    jwt(req, res, next);
  } else {
    next()
  }
}

export const IGNORS = [
  '/favicon.ico',
  '/_next',
  '/static',
  '/sitemap.xml',
  '/robots.txt',
  '/service-worker.js',
  '/manifest.json',
  '/styles.chunk.css.map',
  '/__nextjs',
  '/api/user/register',
  '/api/user/login',
  '/api/product/',
];