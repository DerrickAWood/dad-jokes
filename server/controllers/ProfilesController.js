import express from "express";
import BaseController from "../utils/BaseController";
import auth0Provider from "@bcwdev/auth0provider";
import { profilesService } from "../services/ProfilesService";
import { jokesService } from "../services/JokesService";

export class ProfilesController extends BaseController {
  constructor() {
    super("api/profile");
    this.router
      .get("/:email/jokes", this.getJokesByUserEmail)
      .use(auth0Provider.getAuthorizedUserInfo)
      .get("", this.getUserProfile)
      .put("/:id", this.edit);
  }

  async getJokesByUserEmail(req, res, next) {
    try {
      //NOTE this matches the property on the joke "creatorEmail"
      let query = { creatorEmail: req.params.email }
      res.send(await jokesService.findAll(query));
    } catch (error) {
      next(error);
    }
  }

  async getUserProfile(req, res, next) {
    try {
      let profile = await profilesService.getProfile(req.userInfo);
      res.send(profile);
    } catch (error) {
      next(error);
    }
  }

  async getByLoggedInUser(req, res, next) {
    try {
      //NOTE this matches the property on the joke "creatorEmail"
      let query = { creatorEmail: req.userInfo.email }
      return res.send(jokesService.findAll(query));
    } catch (error) {
      next(error);
    }
  }

  async edit(req, res, next) {
    try {
      req.body.creatorId = req.user.sub;
      res.send(req.body);
    } catch (error) {
      next(error);
    }
  }
}
