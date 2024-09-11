import { content } from "./content.js";
import { createActivity } from "./createActivity.js";
import { updateScore } from "./updateScore.js";
import { levelUp } from "./levelUp.js";
import { showProfile } from "./showProfile.js";
import { showParentDashboard } from "./showParentDashboard.js";
import { analyzeProgress } from "./analyzeProgress.js";
import { calculateSubjectProgress } from "./calculateSubjectProgress.js";
import { registerUser } from "./registerUser.js";
import { loginUser } from "./loginUser.js";
import { getUserProgress } from "./getUserProgress.js";
import { updateUserProgress } from "./updateUserProgress.js";

const readingBtn = document.getElementById("readingBtn");
const mathBtn = document.getElementById("mathBtn");
const scienceBtn = document.getElementById("scienceBtn");
const scoreElement = document.getElementById("score");
const streakElement = document.getElementById("streak");
const progressElement = document.getElementById("progress");

let score = 0;
let streak = 0;
export let progress = 0;
let currentDifficulty = "easy";
let currentSubject = "";
let level = 1;
let user = null;

const difficultyButtons = document.querySelectorAll(".difficulty");
const profileBtn = document.getElementById("profileBtn");

const rewards = [
  "🏅", "🎖️","🏆","⭐","🌟","💎","🎨","🎭","🎼","🏐","🏀","⚽",
];

const activities = {
  reading: {
    easy: [
      { question: "What sound does 'C' make in 'Cat'?", answer: "K" },
      { question: "What's the first letter in 'Apple'?", answer: "A" },
    ],
    medium: [
      { question: "How many syllables are in 'Elephant'?", answer: "3" },
      { question: "What's a synonym for 'Happy'?", answer: "Joyful" },
    ],
    hard: [
      { question: "What's the past tense of 'Run'?", answer: "Ran" },
      { question: "What's an antonym for 'Brave'?", answer: "Cowardly" },
    ],
  },
  math: {
    easy: [
      { question: "What's 2 + 2?", answer: "4" },
      { question: "How many sides does a triangle have?", answer: "3" },
    ],
    medium: [
      { question: "What's 7 x 8?", answer: "56" },
      { question: "What's half of 18?", answer: "9" },
    ],
    hard: [
      { question: "What's the square root of 64?", answer: "8" },
      { question: "What's 15% of 80?", answer: "12" },
    ],
  },
  science: {
    easy: [
      { question: "What planet do we live on?", answer: "Earth" },
      {
        question: "What do plants need to grow?",
        answer: "Water and sunlight",
      },
    ],
    medium: [
      {
        question: "What's the largest planet in our solar system?",
        answer: "Jupiter",
      },
      {
        question: "What's the process by which plants make their own food?",
        answer: "Photosynthesis",
      },
    ],
    hard: [
      {
        question: "What's the hardest natural substance on Earth?",
        answer: "Diamond",
      },
      { question: "What's the closest star to Earth?", answer: "Sun" },
    ],
  },
};

function createMultipleChoiceActivity(subject) {
  const randomActivity =
    activities[subject][currentDifficulty][
      Math.floor(Math.random() * activities[subject][currentDifficulty].length)
    ];
  content.innerHTML = `
        <h2 class="animate__animated animate__rubberBand">${subject.charAt(0).toUpperCase() + subject.slice(1)} Fun! 🎉</h2>
        <p class="float">${randomActivity.question}</p>
        <input type="text" id="answer" placeholder="Type your answer here">
        <button onclick="checkAnswer('${randomActivity.answer}')">Submit</button>
    `;
}

function createDragAndDropActivity(subject) {
  const activities = activities[subject][currentDifficulty];
  const randomIndex = Math.floor(Math.random() * activities.length);
  const randomActivity = activities[randomIndex];

  if (!randomActivity || !randomActivity.question || !randomActivity.answer) {
    console.error('Invalid activity data');
    return;
  }

  const words = randomActivity.answer.split(' ');
  const shuffledWords = words.sort(() => Math.random() - 0.5);

  let dragBoxes = '';
  let dropBoxes = '';

  words.forEach((word, index) => {
    dragBoxes += `<div class="drag-box" draggable="true" data-word="${word}">${word}</div>`;
    dropBoxes += `<div class="drop-box" data-index="${index}"></div>`;
  });

  content.innerHTML = `
    <h2 class="animate__animated animate__rubberBand">${subject.charAt(0).toUpperCase() + subject.slice(1)} Fun! 🎉</h2>
    <p class="float">${randomActivity.question}</p>
    <div id="drag-container">${dragBoxes}</div>
    <div id="drop-container">${dropBoxes}</div>
    <button onclick="checkDragDropAnswer('${randomActivity.answer}')">Submit</button>
  `;

  const dragBoxElements = document.querySelectorAll('.drag-box');
  const dropBoxElements = document.querySelectorAll('.drop-box');

  dragBoxElements.forEach(dragBox => {
    dragBox.addEventListener('dragstart', dragStart);
    dragBox.addEventListener('dragend', dragEnd);
  });

  dropBoxElements.forEach(dropBox => {
    dropBox.addEventListener('dragover', dragOver);
    dropBox.addEventListener('dragenter', dragEnter);
    dropBox.addEventListener('dragleave', dragLeave);
    dropBox.addEventListener('drop', drop);
  });

  function dragStart(e) {
    e.dataTransfer.setData('text/plain', e.target.dataset.word);
    setTimeout(() => {
      e.target.classList.add('hide');
    }, 0);
  }

  function dragEnd(e) {
    e.target.classList.remove('hide');
  }

  function dragOver(e) {
    e.preventDefault();
  }

  function dragEnter(e) {
    e.preventDefault();
    e.target.classList.add('drag-over');
  }

  function dragLeave(e) {
    e.target.classList.remove('drag-over');
  }

  function drop(e) {
    e.target.classList.remove('drag-over');
    const word = e.dataTransfer.getData('text/plain');
    e.target.textContent = word;
  }

  window.checkDragDropAnswer = function(correctAnswer) {
    const userAnswer = Array.from(dropBoxElements)
      .map(box => box.textContent)
      .join(' ');
    updateScore(userAnswer.toLowerCase() === correctAnswer.toLowerCase());
    createActivity(currentSubject);
  };
  content.innerHTML = `
        <h2>Drag and Drop ${subject.charAt(0).toUpperCase() + subject.slice(1)} Activity</h2>
        <p>Drag and drop activity not implemented yet.</p>
    `;
}

function addReward() {
  const rewardCase = document.getElementById("rewardCase");
  const reward = document.createElement("div");
  reward.className = "reward";
  reward.textContent = rewards[Math.floor(Math.random() * rewards.length)];
  rewardCase.appendChild(reward);
}

difficultyButtons.forEach((button) => {
  button.addEventListener("click", () => {
    currentDifficulty = button.dataset.level;
    difficultyButtons.forEach((btn) => (btn.style.opacity = "0.5"));
    button.style.opacity = "1";
  });
});

readingBtn.addEventListener("click", () => createActivity("reading"));
mathBtn.addEventListener("click", () => createActivity("math"));
scienceBtn.addEventListener("click", () => createActivity("science"));
profileBtn.addEventListener("click", showProfile);

// Load user data if it exists
const savedUser = localStorage.getItem("user");
if (savedUser) {
  user = JSON.parse(savedUser);
  score = user.score;
  level = user.level;
  scoreElement.textContent = score;
  document.getElementById("level").textContent = level;
}

const API_URL = "http://localhost:5000/api";

// Function to handle API requests
async function apiRequest(endpoint, method = 'GET', data = null) {
  const url = `${API_URL}${endpoint}`;
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  };

  if (data) {
    options.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
}

// Example usage:
// const userData = await apiRequest('/users/profile');
// const updateResult = await apiRequest('/users/update', 'PUT', { name: 'New Name' });
