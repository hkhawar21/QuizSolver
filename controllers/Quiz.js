import prisma from "../prisma-client/client.js";
import ResponseMessage from "../utils/ResponseMessage.js";

export async function getAllQuiz(req, res) {
  try {
    const quiz = await prisma.quiz.findMany();
    return ResponseMessage(res, 201, quiz, true, null);
  } catch (error) {
    return ResponseMessage(res, 500, null, false, [error.message]);
  }
}

export async function createQuiz(req, res) {
  const { title, description } = req.body;

  // Checking if similar quiz already exists
  const quizExists = await prisma.quiz.findFirst({
    where: {
      title,
      description,
    },
  });
  if (quizExists)
    return ResponseMessage(res, 400, null, false, ["Quiz already exists"]);

  const quiz = await prisma.quiz.create({
    data: {
      title,
      description,
    },
  });
  return ResponseMessage(res, 201, quiz, true, null);
}

// Delete Quiz
export async function deleteQuiz(req, res) {
  const { id } = req.params;
  try {
    const quiz = await prisma.quiz.delete({
      where: {
        id: Number(id),
      },
    });
    return ResponseMessage(res, 201, quiz, true, null);
  } catch (error) {
    return ResponseMessage(res, 500, null, false, [error.message]);
  }
}

// Update Quiz
export async function updateQuiz(req, res) {
  const { id } = req.params;
  const { title, questions } = req.body;
  try {
    const quiz = await prisma.quiz.update({
      where: {
        id: Number(id),
      },
      data: {
        title,
        questions,
      },
    });
    return ResponseMessage(res, 201, quiz, true, null);
  } catch (error) {
    return ResponseMessage(res, 500, null, false, [error.message]);
  }
}
