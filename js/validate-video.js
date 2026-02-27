// ===== ПРОВЕРКА ССЫЛКИ =====
function isValidYandexUrl(url) {
  return (
    url.startsWith("https://disk.yandex.ru/") ||
    url.startsWith("https://yadi.sk/")
  );
}

// ===== HEAD-ПРОВЕРКА =====
async function headCheck(downloadUrl) {
  try {
    const maxSizeGb = 2; // максимум
    const maxSize = maxSizeGb * 1024 * 1024 * 1024;

    const headResp = await axios.get(
      `https://cloud-api.yandex.net/v1/disk/public/resources?public_key=${downloadUrl}`,
    );
    console.log(headResp);
    const len = headResp.data.size;
    const type = headResp.data.mime_type;

    const supported = ["video/mp4", "video/webm", "video/quicktime"];

    if (!supported.includes(type)) {
      alert("Неподдерживаемый формат видео");
      return { ok: false };
    }

    if (len > maxSize) {
      alert("Видео слишком большое (макс 2 ГБ)");
      return { ok: false };
    }

    return { ok: true, length: len, type, file: headResp.data.file };
  } catch (err) {
    alert("Ошибка HEAD-проверки");
    return { ok: false };
  }
}
