const { content, updateScore, progress, levelUp } = require("./script");

function checkAnswer(correctAnswer) {
  const userAnswer = document.getElementById("answer").value;
  if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
    content.innerHTML += `<p class="animate__animated animate__bounceIn" style="color: green;">Correct! Great job! 🎈</p>`;
    updateScore(true);
    sounds.correct.play();
    if (progress >= 100) {
      levelUp();
    }
  } else {
    content.innerHTML += `<p class="animate__animated animate__shakeX" style="color: red;">Oops! Try again. The correct answer is: ${correctAnswer}</p>`;
    updateScore(false);
    sounds.incorrect.play();
  }
}
