import { IUser } from "./../models/UserModel";
import { Request } from "express";
import passportLocal from "passport-local";
import bcrypt from "bcrypt";
import * as jwt from "passport-jwt";

import BaseContext from "../BaseContext";
import { IContextContainer } from "../container";
import config from "../../config";

export default class SignUpStrategy extends BaseContext {
  private strategyUser: passportLocal.Strategy;

  get strategy() {
    return this.strategyUser;
  }

  constructor(opts: IContextContainer) {
    super(opts);

    console.log("jwt: initialization local-SignUp strategy");
    this.verifyRequestUser = this.verifyRequestUser.bind(this);

    this.strategyUser = new passportLocal.Strategy(
      {
        passwordField: "userPasswd", passReqToCallback: true,
        usernameField: "userEmail",
        session: false,
      },
      this.verifyRequestUser
    );
  }

  public async verifyRequestUser(
    req: Request,
    email: string,
    password: string,
    done: any
  ) {
    console.log("!!!verifyRequestUser from signUpStrategy");
    const { UserSeviceCustom, UserModel } = this.di;
    const userEmail = email && email.trim().toLowerCase();
    const user = await UserSeviceCustom.getUserByEmail(userEmail).catch(
      (err) => {
        return done(err);
      }
    );
    if (user) {
      return done({ userEmail: "That e-mail already taken!" });
    }
    const userData = {
      userFirstName: req.body.userFirstName,
      userEmail,
      userPasswd: password,
      userRole: "customer",
    };
    const newUser = await UserModel.create(userData);
    return done(null, {
      identity: newUser.userId,
    });
  }
}
