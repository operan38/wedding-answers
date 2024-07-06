window.onload = function() {
  const url = new URL(window.location.href);
  const questNumber = url.searchParams.get("q");
  const $answer = document.getElementById("answer");

  if (questNumber === "" || questNumber === null || questNumber === undefined) {
    const txt = "Ответа на этот вопрос не существует :(";
    document.title = txt;
    $answer.innerHTML = txt;
    return;
  }

  document.title = `Ответ на ${questNumber} вопрос`;
  $answer.innerHTML = `Ответ на ${questNumber} вопрос`;
}