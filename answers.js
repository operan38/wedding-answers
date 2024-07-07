const QUEST_KEY = 'q';

const url = new URL(window.location.href);
const urlParams = new URLSearchParams(url.search);
const $answer = document.getElementById("answer");
const $questNumber = document.getElementById("quest-number");
const $next = document.getElementById("next");
const $prev = document.getElementById("prev");

let isBlur = false;

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
  console.log('next');
  $questNumber.classList.remove("fadeIn");
  const questNumber = getQuestNumber();
  if (isNumberUncorrect(questNumber)) return;

  setQuest(parseInt(questNumber) + 1);
}

function prev() {
  console.log('prev');
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

function update() {
  addBlur();
  const questNumber = getQuestNumber();

  if (isNumberUncorrect(questNumber)) {
    const txt = "Ответа на этот вопрос не существует :(";
    document.title = txt;
    $answer.innerHTML = txt;
    removeBlur();
    return;
  }
  else if (questNumber <= 1) {
    $prev.style.display = 'none';
  }
  else {
    $prev.style.display = 'block';
  }

  setTimeout(() => {
    $questNumber.classList.add("fadeIn");
  }, 1);

  $questNumber.innerHTML = `Вопрос № ${questNumber}`;
  $answer.innerHTML = `Ответ на ${questNumber} вопрос`;
}

window.onload = function() {
  $questNumber.classList.add("fadeIn");
  update();

  $next.addEventListener("click", next);
  $prev.addEventListener("click", prev);
  $answer.addEventListener("click", removeBlur);
}
