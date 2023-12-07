import {
  questionContainer,
  questionView,
  quiz,
  quizQuestions,
} from "./index.js";

export class Question {
  constructor(index) {
    this.index = index;
    this.category = quizQuestions[index].category;
    this.level = quizQuestions[index].difficulty;
    this.question = quizQuestions[index].question;
    this.correctAnswer = quizQuestions[index].correct_answer;
    this.wrongAnswers = quizQuestions[index].incorrect_answers;
    this.choices = this.getChoices(quizQuestions[index]);
    this.answered = false;
  }
  getChoices(questionDetails) {
    return questionDetails.incorrect_answers
      .concat(questionDetails.correct_answer)
      .sort();
  }

  displayQuestion() {
    let questionBox = `
        
        
                    <div class="d-flex justify-content-between flex-wrap">
                        <span class="p-1 my-2 text-center rounded-1 bg-dark text-white text-start">${
                          this.category
                        }</span>
                        <span class="p-1 my-2 text-center rounded-1 bg-info text-white text-end">${
                          this.index + 1
                        } of ${quizQuestions.length} Questions</span>
                    </div>
                    <p class="text-lead text-capitalize mx-auto my-3 fw-normal">${
                      this.question
                    }</p>
                    <ul class="choices list-unstyled my-3 w-100">
                        ${this.choices
                          .map(
                            (choice) =>
                              `<li class="w-100 my-2 text-center border border-1 border-black rounded-pill p-2">${choice}</li>`
                          )
                          .toString()
                          .replaceAll(",", "")}
                    </ul>
                    <p>Your score is ${quiz.score} &#128512;</p>
        
        `;
    questionContainer.innerHTML = questionBox;
    const choices = Array.from(document.querySelectorAll(".choices li"));
    for (let i = 0; i < choices.length; i++) {
      choices[i].addEventListener("click", () => {
        this.checkAnswer(choices[i]);
        this.nextQuestion();
      });
    }
  }

  checkAnswer(choice) {
    if (!this.answered) {
      this.answered = true;
      if (choice.innerHTML == this.correctAnswer) {
        choice.classList.add(
          "bg-success",
          "animate__animated",
          "animate__flipInX"
        );
        quiz.score++;
      } else {
        choice.classList.add(
          "bg-danger",
          "animate__animated",
          "animate__shakeX"
        );
      }
    }
  }

  nextQuestion() {
    this.index++;
    setTimeout(() => {
      if (this.index < quizQuestions.length) {
        const newQ = new Question(this.index);
        newQ.displayQuestion();
      } else {
        questionContainer.innerHTML = quiz.showResult();
        questionView.classList.replace("d-flex", "d-none");
        const again = document.getElementById("again");
        again.addEventListener("click", function () {
          window.location.reload();
        });
      }
    }, 2000);
  }
}
