const tg = window.Telegram.WebApp;

if (!tg) {
  alert("Mini App не в Telegram");
} else {
  tg.ready();
  alert(tg.initDataUnsafe);
}

const user = tg.initDataUnsafe.user;

if (user) {
  console.log("User ID:", user.id);
  console.log("Username:", user.username);
  console.log("First name:", user.first_name);
}

alert(JSON.stringify(user));

const analyzeButton = document.getElementById("analyzeButton");
const form = document.getElementById("analysisForm");

analyzeButton.addEventListener("click", () => {
  form.classList.toggle("hidden");
});

document.getElementById("mainButton").addEventListener("click", () => {
  tg.close();
});
