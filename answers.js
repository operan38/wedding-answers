const QUEST_KEY = "q";
const BLUE = "blue";
const YELLOW = "yellow";
const GREEN = "green";
const RED = "red";
const ORANGE = "orange";

const questions = [
  { answer: "апрель", isJoke: false, color: BLUE },
  { answer: "6 лет", isJoke: false, color: BLUE },
  { answer: "Санкт-Петербург", isJoke: false, color: BLUE },
  { answer: "Санкт-Петербург", isJoke: false, color: BLUE },
  { answer: "покупка квартиры", isJoke: false, color: BLUE },
  { answer: "кровать", isJoke: false, color: BLUE },
  { answer: "жених", isJoke: false, color: BLUE },
  { answer: "карие", isJoke: false, color: BLUE },
  { answer: "зелёные", isJoke: false, color: BLUE },
  { answer: "запечённые ребрышки", isJoke: false, color: BLUE },
  { answer: "ванная комната", isJoke: false, color: ORANGE },
  { answer: "компьютерные игры", isJoke: false, color: ORANGE },
  { answer: "боязнь высоты", isJoke: false, color: ORANGE },
  { answer: "коробки", isJoke: false, color: ORANGE },
  { answer: "компьютер жениха", isJoke: false, color: ORANGE },
  { answer: "у жениха", isJoke: false, color: ORANGE },
  { answer: "бананы", isJoke: false, color: ORANGE },
  { answer: "солянка", isJoke: false, color: ORANGE },
  { answer: "жених", isJoke: true, color: ORANGE, answerJoke: "Попались! На самом деле это невеста" },
  { answer: "зима", isJoke: false, color: ORANGE },
  { answer: "Соня", isJoke: false, color: GREEN },
  { answer: "программист", isJoke: false, color: GREEN },
  { answer: "учитель начальных классов", isJoke: false, color: GREEN },
  { answer: "суббота", isJoke: false, color: GREEN },
  { answer: "Lada Granta", isJoke: false, color: GREEN },
  { answer: "Niva", isJoke: true, color: GREEN, answerJoke: "Это шутка :) Жених сам не знает" },
  { answer: "торт Наполеон", isJoke: false, color: GREEN },
  { answer: "пельмени домашние", isJoke: false, color: GREEN },
  { answer: "ящерица", isJoke: false, color: GREEN },
  { answer: "ужасы", isJoke: false, color: GREEN },
  { answer: "трамвай", isJoke: false, color: YELLOW },
  { answer: "кеды", isJoke: false, color: YELLOW },
  { answer: "рыбы", isJoke: false, color: YELLOW },
  { answer: "рак", isJoke: false, color: YELLOW },
  { answer: "4 этаж", isJoke: false, color: YELLOW },
  { answer: "Спанч Боб", isJoke: false, color: YELLOW },
  { answer: "невеста", isJoke: false, color: YELLOW },
  { answer: "нуль", isJoke: false, color: YELLOW },
  { answer: "дверь", isJoke: false, color: YELLOW },
  { answer: "ночью", isJoke: false, color: YELLOW },
  { answer: "никто", isJoke: false, color: RED },
  { answer: "8.67 гр", isJoke: false, color: RED },
  { answer: "с поиска визажиста", isJoke: false, color: RED },
  { answer: "кольца", isJoke: false, color: RED },
  { answer: "вместе", isJoke: false, color: RED },
  { answer: "20 гостей", isJoke: false, color: RED },
  { answer: "Елена", isJoke: false, color: RED },
  { answer: "500 - 600 гр", isJoke: false, color: RED },
  { answer: "больше 1 метра", isJoke: false, color: RED },
  { answer: "42", isJoke: false, color: RED },
  { answer: "у жениха", isJoke: false, color: BLUE },
  { answer: "в кровати", isJoke: false, color: BLUE },
  { answer: "после 23:00", isJoke: false, color: BLUE },
  { answer: "жених", isJoke: false, color: BLUE },
  { answer: "невеста", isJoke: false, color: BLUE },
  { answer: "невеста", isJoke: false, color: BLUE },
  { answer: "жених", isJoke: false, color: BLUE },
  { answer: "жених", isJoke: false, color: BLUE },
  { answer: "невеста", isJoke: false, color: BLUE },
  { answer: "невеста", isJoke: false, color: ORANGE },
  { answer: "из-за невесты", isJoke: false, color: ORANGE },
  { answer: "Алексей", isJoke: false, color: ORANGE },
  { answer: "3 года", isJoke: false, color: ORANGE },
  { answer: "пока не разбудят коты", isJoke: false, color: ORANGE },
  { answer: "кот-шпрот", isJoke: false, color: ORANGE },
  { answer: "3 подружки", isJoke: false, color: ORANGE },
];

const url = new URL(window.location.href);
const urlParams = new URLSearchParams(url.search);
const $answer = document.getElementById("answer");
const $questNumber = document.getElementById("quest-number");
const $next = document.getElementById("next");
const $prev = document.getElementById("prev");
const $readme = document.getElementById("readme");
const $gameScreen = document.getElementById("game");
const $endScreen = document.getElementById("end");

let jokeTimeout = null;
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

function getQuestNumber() { // Получить номер вопроса
  return urlParams.get(QUEST_KEY);
}

function isNumberUncorrect(num) { // Если номер в url некорректный
  return num === "" || num === null || num === undefined ? true : false;
}

function next() {
  $questNumber.classList.remove("fadeIn");
  const questNumber = getQuestNumber();

  if (isNumberUncorrect(questNumber)) return;
  else if (questNumber >= questions.length) { // Конец вопросов
    $endScreen.style.display = "flex";
    $gameScreen.style.display = "none";
    return;
  }

  const newQuestNumber = parseInt(questNumber) + 1;
  setQuest(newQuestNumber);

  if (isReadme) hideReadme();
}

function prev() {
  $questNumber.classList.remove("fadeIn");
  const questNumber = getQuestNumber();
  if (isNumberUncorrect(questNumber)) return;

  const newQuestNumber = parseInt(questNumber) - 1;
  setQuest(newQuestNumber);
}

function addBlur() {
  isBlur = true;
  $answer.classList.add("blur");
  $answer.classList.remove("unblur");
}

function removeBlur() {
  const questNumber = getQuestNumber();
  isBlur = false;
  $answer.classList.remove("blur");
  $answer.classList.add("unblur");
  const quest = questions[questNumber - 1];

  if (isNumberUncorrect(questNumber)) return;

  if (quest?.isJoke) {
    jokeTimeout = setTimeout(() => {
    $answer.innerHTML = quest?.answerJoke;
    }, 2200);
  }
}

function showReadme() {
  isReadme = true;
  $readme.style.display = "block";
  $readme.classList.add("fadeIn");
}

function hideReadme() {
  isReadme = false;
  $readme.style.display = "none";
  $readme.classList.remove("fadeIn");
}

function toggleColor(num) {
  const body = document.querySelector("body");
  body.className = "";
  body.classList.add(`${questions[num - 1].color}Bg`);
}

function update() {
  addBlur();
  clearTimeout(jokeTimeout);
  const questNumber = getQuestNumber();

  if (isNumberUncorrect(questNumber) || questNumber > questions.length) {
    const txt = "Ответа на этот вопрос не существует :(";
    document.title = txt;
    $answer.innerHTML = txt;
    removeBlur();
    toggleColor(1);
    $prev.style.display = "none";
    $next.style.display = "none";
    return;
  }
  else if (questNumber <= 1) {
    $prev.style.display = "none";
    $next.style.display = "block";
  }
  else if (questNumber > questions.length) {
    $prev.style.display = "block";
    $next.style.display = "none";
  }
  else {
    $prev.style.display = "block";
    $next.style.display = "block";
  }

  if (questNumber <= 1) showReadme();

  setTimeout(() => {
    $questNumber.classList.add("fadeIn");
  }, 1);

  $questNumber.innerHTML = `Ответ на вопрос № ${questNumber}`;

  $answer.innerHTML = `${questions[questNumber - 1].answer}`;
  toggleColor(questNumber);
}

window.onload = function() {
  $questNumber.classList.add("fadeIn");

  $next.addEventListener("click", next);
  $prev.addEventListener("click", prev);
  $answer.addEventListener("mousedown", removeBlur);

  update();
}
