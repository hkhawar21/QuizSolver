import express from "express";
import cors from "cors";
import { questionRouter } from "./routes/api/question.js";
import { quizRouter } from "./routes/api/quiz.js";

const app = express();

app.use(cors());
app.use(express.json({ extended: false }));

const port = process.env.PORT || "3000";

app.listen(port, () => {
  console.log(`Server Running at ${port} 🚀`);
});
app.use("/api/questions", questionRouter);
app.use("/api/quiz", quizRouter);

app.get("/", async (req, res) => {
  res.send("Server is running");
});
