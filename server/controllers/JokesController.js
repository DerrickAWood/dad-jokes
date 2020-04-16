import express from "express";
import BaseController from "../utils/BaseController";
import { jokesService } from "../services/JokesService";
import auth0Provider from "@bcwdev/auth0provider";
import Joke from "../models/Joke";
import { BadRequest } from "../utils/Errors";

export class JokesController extends BaseController {
  constructor() {
    super("api/jokes");
    this.router
      .get("", this.getAll)
      // NOTE: Beyond this point all routes require Authorization tokens (the user must be logged in)
      .get("/:id", this.getById)
      .use(auth0Provider.getAuthorizedUserInfo)
      .post("", this.create)
      .delete("/:id", this.delete)
  }

  
//get by id - post that joke to /myFavs - new get to myFavs then post to profile/myFavs arr


  async getAll(req, res, next) {
    try {
      res.send(await jokesService.findAll());
    } catch (error) {
      next(error);
    }
  }

  async getById(req,res,next) {
    try {
      res.send(await jokesService.getById(req.params.id))
      if(!Joke){
        throw new BadRequest("bad id")
      }
    } catch (error) {
      next(error)
    }
  }

  async delete(req,res,next){
    try {
      let joke = await jokesService.delete(req.params.id)
      return res.send("deleted")
    } catch (error) {
      next(error)
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
