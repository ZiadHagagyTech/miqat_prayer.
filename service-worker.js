const CACHE_VERSION = "miqat-pwa-v2";
const APP_SHELL = [
  "./",
  "./index.html",
  "./style.css",
  "./script.js",
  "./pwa.js",
  "./manifest.json",
  "./icons/miqat-192.png",
  "./icons/miqat-512.png"
];
const API_ORIGIN = "https://api.aladhan.com";

self.addEventListener("install", event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_VERSION);
    await cache.addAll(APP_SHELL);
    await self.skipWaiting();
  })());
});

self.addEventListener("activate", event => {
  event.waitUntil((async () => {
    const names = await caches.keys();
    await Promise.all(names.filter(name => name.startsWith("miqat-pwa-") && name !== CACHE_VERSION)
      .map(name => caches.delete(name)));
    await self.clients.claim();
  })());
});

self.addEventListener("fetch", event => {
  const request = event.request;
  if (request.method !== "GET") return;
  const url = new URL(request.url);

  // Prayer-time API: try the network first, keep successful responses for offline fallback.
  if (url.origin === API_ORIGIN) {
    event.respondWith((async () => {
      const cache = await caches.open(CACHE_VERSION);
      try {
        const response = await fetch(request);
        if (response && response.ok) await cache.put(request, response.clone());
        return response;
      } catch (error) {
        const cached = await cache.match(request);
        if (cached) return cached;
        return new Response(JSON.stringify({
          code: 503,
          status: "Offline",
          data: null,
          message: "لا يوجد اتصال بالإنترنت، ولا توجد نسخة محفوظة من هذه البيانات."
        }), { status: 503, headers: { "Content-Type": "application/json; charset=utf-8" } });
      }
    })());
    return;
  }

  // App shell: serve local files from cache; refresh them in the background when online.
  if (url.origin === self.location.origin) {
    if (request.mode === "navigate") {
      event.respondWith((async () => {
        try {
          const response = await fetch(request);
          if (response && response.ok) {
            const cache = await caches.open(CACHE_VERSION);
            cache.put("./index.html", response.clone());
          }
          return response;
        } catch (error) {
          return (await caches.match("./index.html")) || (await caches.match("./"));
        }
      })());
      return;
    }
    event.respondWith((async () => {
      const cached = await caches.match(request);
      if (cached) {
        fetch(request).then(async response => {
          if (response && response.ok) {
            const cache = await caches.open(CACHE_VERSION);
            await cache.put(request, response.clone());
          }
        }).catch(() => {});
        return cached;
      }
      try {
        const response = await fetch(request);
        if (response && response.ok) {
          const cache = await caches.open(CACHE_VERSION);
          await cache.put(request, response.clone());
        }
        return response;
      } catch (error) {
        return new Response("الملف غير متاح دون اتصال بالإنترنت.", { status: 503, headers: { "Content-Type": "text/plain; charset=utf-8" } });
      }
    })());
  }
});
