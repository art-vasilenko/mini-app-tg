const tg = window.Telegram.WebApp;
tg.ready();

const user = tg.initDataUnsafe.user;

if (user) {
  console.log("User ID:", user.id);
  console.log("Username:", user.username);
  console.log("First name:", user.first_name);
}

const analyzeButton = document.getElementById("analyzeButton");
const form = document.getElementById("analysisForm");

analyzeButton.addEventListener("click", () => {
  form.classList.toggle("hidden");
});

document.getElementById("mainButton").addEventListener("click", () => {
  tg.close();
});
