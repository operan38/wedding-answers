const QUEST_KEY = 'q';

const url = new URL(window.location.href);
const urlParams = new URLSearchParams(url.search);
const $answer = document.getElementById("answer");
const $questNumber = document.getElementById("quest-number");
const $next = document.getElementById("next");
const $prev = document.getElementById("prev");
const $readme = document.getElementById("readme");

const questions = [
  {trueAnswer: "Истинный ответ 1", isJoke: true, jokeAnswer: "Шуточный ответ 1"},
  {trueAnswer: "Истинный ответ 2", isJoke: false},
  {trueAnswer: "Истинный ответ 3", isJoke: false}
];

let isBlur = false;
let isReadme = false;

window.history.pushState = new Proxy(window.history.pushState, {
  apply: (target, thisArg, argArray) => {
    let output = target.apply(thisArg, argArray);
    update();
    return output;
  },
});

function setQuest(num) {
  urlParams.set(QUEST_KEY, num);
  url.search = urlParams.toString();
  history.pushState({}, "", url);
};

function getQuestNumber() {
  return urlParams.get(QUEST_KEY);
}

function isNumberUncorrect(num) {
  return num === "" || num === null || num === undefined ? true : false;
}

function next() {
  $questNumber.classList.remove("fadeIn");
  const questNumber = getQuestNumber();
  if (isNumberUncorrect(questNumber) || questNumber >= questions.length) return;

  setQuest(parseInt(questNumber) + 1);

  if (isReadme) hideReadme();
}

function prev() {
  $questNumber.classList.remove("fadeIn");
  const questNumber = getQuestNumber();
  if (isNumberUncorrect(questNumber)) return;

  setQuest(parseInt(questNumber) - 1);
}

function addBlur() {
  isBlur = true;
  $answer.classList.add("blur");
  $answer.classList.remove("unblur");
}

function removeBlur() {
  isBlur = false;
  $answer.classList.remove("blur");
  $answer.classList.add("unblur");
}

function showReadme() {
  isReadme = true;
  $readme.style.display = 'block';
  $readme.classList.add("fadeIn");
}

function hideReadme() {
  isReadme = false;
  $readme.style.display = 'none';
  $readme.classList.remove("fadeIn");
}

function update() {
  addBlur();
  const questNumber = getQuestNumber();

  if (isNumberUncorrect(questNumber) || questNumber > questions.length) {
    const txt = "Ответа на этот вопрос не существует :(";
    document.title = txt;
    $answer.innerHTML = txt;
    removeBlur();
    return;
  }
  else if (questNumber <= 1) {
    $prev.style.display = 'none';
    $next.style.display = 'block';
  }
  else if (questNumber >= questions.length) {
    $prev.style.display = 'block';
    $next.style.display = 'none';
  }
  else {
    $prev.style.display = 'block';
    $next.style.display = 'block';
  }

  if (questNumber <= 1) showReadme();

  setTimeout(() => {
    $questNumber.classList.add("fadeIn");
  }, 1);

  $questNumber.innerHTML = `Ответ на вопрос № ${questNumber}`;

  $answer.innerHTML = `${questions[questNumber - 1].trueAnswer}`;
}

window.onload = function() {
  $questNumber.classList.add("fadeIn");
  update();

  $next.addEventListener("click", next);
  $prev.addEventListener("click", prev);
  $answer.addEventListener("click", removeBlur);
}
