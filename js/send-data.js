document.getElementById("sendButton").addEventListener("click", async () => {
  const resume = document.getElementById("resumeInput").files[0];
  const gfd = document.getElementById("gfdInput").files[0];
  const link = document.getElementById("yandexLink").value.trim();

  // ===== ВАЛИДАЦИЯ РЕЗЮМЕ =====
  if (!resume) {
    alert("Загрузите резюме!");
    return;
  }
  if (resume.type !== "application/pdf") {
    alert("Резюме должно быть PDF!");
    return;
  }
  if (resume.size > 1024 * 1024 * 1024) {
    alert("Резюме > 1 ГБ недопустимо!");
    return;
  }

  // ===== ВАЛИДАЦИЯ ГФД =====
  if (!gfd) {
    alert("Загрузите ГФД!");
    return;
  }
  if (gfd.type !== "application/pdf") {
    alert("ГФД должен быть PDF!");
    return;
  }
  if (gfd.size > 1024 * 1024 * 1024) {
    alert("ГФД > 1 ГБ недопустимо!");
    return;
  }

  // ===== ВАЛИДАЦИЯ ССЫЛКИ =====
  if (!link) {
    alert("Укажите ссылку на Яндекс Диск!");
    return;
  }

  if (!isValidYandexUrl(link)) {
    alert("Неверная ссылка Яндекс Диска!");
    return;
  }

  try {
    const head = await headCheck(link);
    if (!head.ok) return;
    console.log(head.file);

    alert("Видео готово к загрузке! Всё в порядке.");
  } catch (err) {
    alert("Ошибка обработки ссылки");
  }
});
