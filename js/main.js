const tg = window.Telegram.WebApp;
tg.ready();

const analyzeButton = document.getElementById("analyzeButton");
const form = document.getElementById("analysisForm");

analyzeButton.addEventListener("click", () => {
  form.classList.toggle("hidden");
});

document.getElementById("mainButton").addEventListener("click", () => {
  tg.close();
});
