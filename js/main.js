const tg = window.Telegram.WebApp;
console.log(tg.initData);

(async () => {
  if (!tg) {
    alert("Mini App не в Telegram");
    return;
  }

  tg.ready();

  try {
    const response = await fetch(
      "https://artem.maxis-it.ru/api/v1/check-user",
      {
        method: "POST",
        headers: {
          Authorization: `tma ${tg.initData}`,
        },
      },
    );

    if (!response.ok) {
      tg.close();
    }
  } catch (e) {
    console.error(e);
  }
})();

const analyzeButton = document.getElementById("analyzeButton");
const form = document.getElementById("analysisForm");

analyzeButton.addEventListener("click", () => {
  form.classList.toggle("hidden");
});

document.getElementById("mainButton").addEventListener("click", () => {
  tg.close();
});
