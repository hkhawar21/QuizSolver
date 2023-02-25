import { Router } from "express";
import {
  getAllQuestions,
  createQuestion,
  deleteQuestion,
  updateQuestion,
} from "../../controllers/Question.js";

const questionRouter = Router();

questionRouter.get("/", getAllQuestions);
questionRouter.post("/", createQuestion);
questionRouter.delete("/:id", deleteQuestion);
questionRouter.put("/:id", updateQuestion);

export { questionRouter };
