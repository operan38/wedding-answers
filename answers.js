const QUEST_KEY = 'q';

const $answer = document.getElementById("answer");
const $next = document.getElementById("next");
const $prev = document.getElementById("prev");

window.history.pushState = new Proxy(window.history.pushState, {
  apply: (target, thisArg, argArray) => {
    update();
    let output = target.apply(thisArg, argArray);
    console.log('output: ', output)
    return output;
  },
});

function setQuest(num) {
  const url = new URL(window.location.href);
  const urlParams = new URLSearchParams(url.search);
  urlParams.set(QUEST_KEY, num);
  url.search = urlParams.toString();
  history.pushState({}, "", url);
};

function next() {
  console.log('next');
  const url = new URL(window.location.href);
  const questNumber = parseInt(url.searchParams.get(QUEST_KEY));

  setQuest(questNumber + 1);
}

function prev() {
  console.log('prev');
  const url = new URL(window.location.href);
  const questNumber = parseInt(url.searchParams.get(QUEST_KEY));

  setQuest(questNumber - 1);
}

function update() {
  const url = new URL(window.location.href);
  const questNumber = url.searchParams.get(QUEST_KEY);

  if (questNumber === "" || questNumber === null || questNumber === undefined) {
    const txt = "Ответа на этот вопрос не существует :(";
    document.title = txt;
    $answer.innerHTML = txt;
    return;
  }

  document.title = `Ответ на ${questNumber} вопрос`;
  $answer.innerHTML = `Ответ на ${questNumber} вопрос`;
}

window.onload = function() {
  update();

  $next.addEventListener("click", next);
  $prev.addEventListener("click", prev);
}
