import { Question } from "./Question.js";
import { Quiz } from "./Quiz.module.js";

// ! html catches
export const quizSelection = document.getElementById("quizSelection");
export const categoryMenu = document.getElementById("categoryMenu");
export const levelMenu = document.getElementById("levelMenu");
export const questionsNumber = document.getElementById("questionsNumber");
const startBtn = document.getElementById("startBtn");
export const questionView = document.getElementById("questionView");
export const questionContainer = document.querySelector(".question-container");

// ! app variables
export let quiz;
export let quizQuestions;

startBtn.addEventListener("click", async function () {
  const categorySelection = categoryMenu.value;
  const levelSelection = levelMenu.value;
  const questionsNumberSet = questionsNumber.value;

  quiz = new Quiz(categorySelection, levelSelection, questionsNumberSet);
  quizQuestions = await quiz.getQuestionsFromApi();
  let question = new Question(0);
  quizSelection.classList.add("d-none");
  questionContainer.classList.replace("d-none", "d-block");
  question.displayQuestion();
});
