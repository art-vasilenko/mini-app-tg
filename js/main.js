const tg = window.Telegram.WebApp;
console.log(tg.initData);

if (!tg) {
  alert("Mini App не в Telegram");
} else {
  tg.ready();
  const response = await fetch("https://artem.maxis-it.ru/api/v1/check-user", {
    method: "POST",
    body: tg.initData,
  });

  if (!response.ok) {
    tg.close();
  }
}

const analyzeButton = document.getElementById("analyzeButton");
const form = document.getElementById("analysisForm");

analyzeButton.addEventListener("click", () => {
  form.classList.toggle("hidden");
});

document.getElementById("mainButton").addEventListener("click", () => {
  tg.close();
});
