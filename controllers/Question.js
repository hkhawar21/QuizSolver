import prisma from "../prisma-client/client.js";
import ResponseMessage from "../utils/ResponseMessage.js";

export async function getAllQuestions(req, res) {
  try {
    const questions = await prisma.question.findMany();
    return ResponseMessage(res, 201, questions, true, null);
  } catch (error) {
    return ResponseMessage(res, 500, null, false, [error.message]);
  }
}

export async function createQuestion(req, res) {
  const { title, quizId, answers, mandatory, answer } = req.body;

  console.log(answers);

  // quizId    Int
  // title     String
  // answers   String[]
  // mandatory Boolean
  // answer    String

  // Checking if similar question already exists
  const questionExists = await prisma.question.findFirst({
    where: {
      title,
      quizId,
      answer,
      mandatory,
    },
  });
  if (questionExists)
    return ResponseMessage(res, 400, null, false, ["Question already exists"]);

  const question = await prisma.question.create({
    data: {
      title,
      quizId,
      answer,
      answers,
      mandatory,
    },
  });
  return ResponseMessage(res, 201, question, true, null);
}

// Delete Question
export async function deleteQuestion(req, res) {
  const { id } = req.params;
  try {
    const question = await prisma.question.delete({
      where: {
        id: Number(id),
      },
    });
    return ResponseMessage(res, 201, question, true, null);
  } catch (error) {
    return ResponseMessage(res, 500, null, false, [error.message]);
  }
}

// Update Question
export async function updateQuestion(req, res) {
  const { id } = req.params;
  const { title, quizId, answers, mandatory, answer } = req.body;
  try {
    const question = await prisma.question.update({
      where: {
        id: Number(id),
      },
      data: {
        title,
        answer,
        answers,
        mandatory,
      },
    });
    return ResponseMessage(res, 201, question, true, null);
  } catch (error) {
    return ResponseMessage(res, 500, null, false, [error.message]);
  }
}
