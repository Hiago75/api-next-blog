import { Router } from "express";
import TagsController from "../controllers/TagsController";

// TODO: add celebrate
const tagsRouter = Router();
const tagsController = new TagsController();

// List
tagsRouter.get('/', tagsController.index);

// Create
tagsRouter.post('/', tagsController.create);

// Delete
tagsRouter.delete('/', tagsController.delete);
