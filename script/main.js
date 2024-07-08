import { questions } from "./databse.js";

const quiz = document.querySelector("#quiz");
const template = document.querySelector("template");

const rightAnswers = new Set();
const totalQuestions = questions.length;
const showTotal = document.querySelector(".result-component span");

for (let item of questions) {
  const quizItem = template.content.cloneNode(true);
  quizItem.querySelector("h3").textContent = item.pergunta;

  for (let resposta of item.respostas) {
    const dt = quizItem.querySelector("dl dt").cloneNode(true);
    const answerIndex = questions.indexOf(item);
    const inputElement = dt.querySelector("input");

    dt.querySelector("span").textContent = resposta;
    inputElement.setAttribute("name", `Pergunta ${answerIndex}`);
    inputElement.value = item.respostas.indexOf(resposta);

    inputElement.onchange = (event) => {
      const selectedAnswer = event.target.value == item.correta;

      rightAnswers.delete();
      if (selectedAnswer) {
        rightAnswers.add(item);
      }
      showTotal.textContent = `${rightAnswers.size} de ${totalQuestions}`;
    };

    quizItem.querySelector("dl").appendChild(dt);
  }
  quizItem.querySelector("dl dt").remove();
  quiz.appendChild(quizItem);
}
