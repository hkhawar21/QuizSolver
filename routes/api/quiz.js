import { Router } from "express";
import {
  getAllQuiz,
  createQuiz,
  deleteQuiz,
  updateQuiz,
} from "../../controllers/Quiz.js";

export const quizRouter = Router();

quizRouter.get("/", getAllQuiz);
quizRouter.post("/", createQuiz);
quizRouter.delete("/:id", deleteQuiz);
quizRouter.put("/:id", updateQuiz);
