import express, { NextFunction, Request, Response } from "express";
import next from "next";
import bodyParser from 'body-parser';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import { loadControllers, scopePerRequest } from "awilix-express";
import { PassportStatic } from 'passport';
import cookieSession from 'cookie-session';
import fileUpload from 'express-fileupload';

import container from "./container";
import config from "../config";
import { IIdentity } from "../constants";
import httpStatus from '../http-status'


const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const port = process.env.PORT || 3000;

const passport = container.resolve<PassportStatic>('passportCustom');

(async () => {
  try {
    await app.prepare();

    const server = express()

    server.use(bodyParser.json({ limit: '10mb' }));
    server.use(bodyParser.urlencoded({ extended: true }));
    server.use(cookieSession({
      name: 'session',
      keys: [config.jwtSecret],
      maxAge: 312460601000,
    }));
    server.use(cookieParser())
    server.use(compression());
    server.use(passport.initialize());  
    server.use(fileUpload({}));
    server.use(answers)
    server.use(acl);

    server.use(scopePerRequest(container));
    const files = 'controllers/**/*.ts';
    server.use(loadControllers(files, { cwd: __dirname }));

    server.get('/login', (req: Request, res: Response) => {
      // @ts-ignore
      return app.render(req, res, '/login')
    })

    // server.get('/logout', (req: Request, res: Response) => {
    //   console.log('/logout', req.params)
    //   // @ts-ignore
    //   return res.redirect('/api/user/logout');
    // })

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
    const jwt = passport.authenticate('local-jwt', (err, identity: IIdentity) => {
      const isLogged = identity && identity.userId ;
      if (!isLogged) {
        const isAPICall = req.path.toLowerCase().includes('api')
        if (isAPICall) {
            return res.json({
              data : null,
              message: 'You are not authorized to open this page',
              error: true,
            })
        }
        //  else {
        //     // return res.redirect('/');            
        //     return handle(req, res);
        // }
      }
      req.identity = identity;
      next()
    });
    jwt(req, res, next);
  } else {
    next()
  }
}

const answers = (req: Request, res: Response, next: NextFunction) => {
  res.answer = (
    data: any,
    message: any = null,
    status: number = httpStatus.OK,
  ) => {
    return res.status(status).send({
      data,
      message,
      error: status !== 200 ? true : false,
    });
  };

  res.print = (path: string, ssrData: any = {}) => {
    req.ssrData= ssrData;
    return app.render(req, res, path, req.params);
  }
  next();
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
   '/api/user/login',
   '/api/product',
   '/api/review',
  '/product/',
];