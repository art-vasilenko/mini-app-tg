// ===== ПРОВЕРКА ССЫЛКИ =====
function isValidYandexUrl(url) {
  return (
    url.startsWith("https://disk.yandex.ru/") ||
    url.startsWith("https://yadi.sk/")
  );
}

// ===== ПОЛУЧЕНИЕ ПРЯМОЙ ССЫЛКИ =====
async function getYandexDownloadUrlVideo(publicUrl) {
  const apiUrl =
    "https://cloud-api.yandex.net/v1/disk/public/resources/download";
  try {
    const response = await axios.get(apiUrl, {
      params: { public_key: publicUrl },
    });
    return response.data.href || null;
  } catch (err) {
    alert("Не удалось получить ссылку на скачивание");
    return null;
  }
}

// ===== HEAD-ПРОВЕРКА =====
async function headCheck(downloadUrl) {
  try {
    const maxSizeGb = 2; // максимум
    const maxSize = maxSizeGb * 1024 * 1024 * 1024;

    const headResp = await axios.head(downloadUrl);
    const len = parseInt(headResp.headers["content-length"] || "0", 10);
    const type = (headResp.headers["content-type"] || "").split(";")[0];

    const supported = ["video/mp4", "video/webm", "video/quicktime"];

    if (!supported.includes(type)) {
      alert("Неподдерживаемый формат видео");
      return { ok: false };
    }

    if (len > maxSize) {
      alert("Видео слишком большое (макс 2 ГБ)");
      return { ok: false };
    }

    return { ok: true, length: len, type };
  } catch (err) {
    alert("Ошибка HEAD-проверки");
    return { ok: false };
  }
}
