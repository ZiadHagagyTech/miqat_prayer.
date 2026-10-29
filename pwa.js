(() => {
  const installButton = document.getElementById("installAppButton");
  const status = document.getElementById("pwaStatus");
  let installPrompt = null;
  let statusTimer = null;

  function showStatus(message) {
    if (!status) return;
    status.textContent = message;
    status.hidden = false;
    clearTimeout(statusTimer);
    statusTimer = setTimeout(() => { status.hidden = true; }, 5500);
  }

  if ("serviceWorker" in navigator && (location.protocol === "https:" || location.hostname === "localhost" || location.hostname === "127.0.0.1")) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("./service-worker.js")
        .then(() => {
          if (!navigator.onLine) showStatus("أنت غير متصل بالإنترنت. سيعمل الموقع بالملفات والبيانات المحفوظة مسبقًا قدر الإمكان.");
        })
        .catch(error => console.warn("تعذر تفعيل وضع العمل دون إنترنت:", error));
    });
  }

  window.addEventListener("beforeinstallprompt", event => {
    event.preventDefault();
    installPrompt = event;
    if (installButton) installButton.hidden = false;
  });

  if (installButton) {
    installButton.addEventListener("click", async () => {
      if (!installPrompt) {
        showStatus("لو زر التثبيت مش متاح، افتح قائمة المتصفح واختر «تثبيت التطبيق» أو «إضافة إلى الشاشة الرئيسية» إذا كان الخيار ظاهرًا.");
        return;
      }
      installPrompt.prompt();
      await installPrompt.userChoice;
      installPrompt = null;
      installButton.hidden = true;
    });
  }

  window.addEventListener("appinstalled", () => {
    if (installButton) installButton.hidden = true;
    showStatus("تم تثبيت مِيقات على جهازك بنجاح.");
  });

  window.addEventListener("offline", () => {
    showStatus("انقطع الاتصال بالإنترنت. سيحاول مِيقات استخدام الملفات والبيانات المحفوظة.");
  });
  window.addEventListener("online", () => {
    showStatus("عاد الاتصال بالإنترنت. يمكنك تحديث مواقيت الصلاة للحصول على أحدث البيانات.");
  });
})();
