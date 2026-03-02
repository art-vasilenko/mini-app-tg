document.getElementById("sendButton").addEventListener("click", async () => {
  const resume = document.getElementById("resumeInput").files[0];
  const gfd = document.getElementById("gfdInput").files[0];
  const video = document.getElementById("videoInput").files[0];
  const link = document.getElementById("yandexLink").value.trim();

  // ===== ВАЛИДАЦИЯ РЕЗЮМЕ =====
  if (!resume) {
    alert("Загрузите резюме!");
    return;
  }

  console.log(resume);
  console.log(gfd);
  console.log(video);

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

    const formData = new FormData();
    formData.append("resume", resume);
    formData.append("gfd", gfd);
    if (video) formData.append("video", video);
    formData.append("link", head.file);

    const response = await fetch("https://artem.maxis-it.ru/api/v1/analyze", {
      method: "POST",
      body: formData,
    });

    const result = await response.json();
    console.log(result);
    alert("Файлы отправлены!");
  } catch (err) {
    alert("Ошибка обработки ссылки");
  }
});
