import { dbContext } from "../db/DbContext";
import { BadRequest } from "../utils/Errors";

class JokesService {
  async create(body) {
    return await dbContext.Jokes.create(body)
  }

  async findAll(query = {}) {
    let jokes = await dbContext.Jokes.find(query).populate("creator", "name picture");
    return jokes;
  }

  async findById(id) {
    let joke = await dbContext.Jokes.findById(id);
    if (!joke) {
      throw new BadRequest("Invalid Id");
    }
    return joke;
  }
}

export const jokesService = new JokesService();
