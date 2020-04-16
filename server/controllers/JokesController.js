import express from "express";
import BaseController from "../utils/BaseController";
import { jokesService } from "../services/JokesService";
import auth0Provider from "@bcwdev/auth0provider";

export class JokesController extends BaseController {
  constructor() {
    super("api/jokes");
    this.router
      .get("", this.getAll)
      // NOTE: Beyond this point all routes require Authorization tokens (the user must be logged in)
      .use(auth0Provider.getAuthorizedUserInfo)
      .post("", this.create);
  }

  async getAll(req, res, next) {
    try {
      res.send(await jokesService.findAll());
    } catch (error) {
      next(error);
    }
  }

  async getByLoggedInUser(req, res, next) {
    try {
      //NOTE this matches the property on the joke "creatorEmail"
      let query = { creatorEmail: req.userInfo.email }
      res.send(await jokesService.findAll(query));
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      // NOTE NEVER TRUST THE CLIENT TO ADD THE CREATOR ID
      req.body.creatorEmail = req.userInfo.email;
      // let joke = await jokesService.create(req.body) 
      res.send(await jokesService.create(req.body));
    } catch (error) {
      next(error);
    }
  }
}
