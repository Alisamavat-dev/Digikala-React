const CACHE_NAME = "digikala-cache-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/assets/main.js",
  "/assets/index.css",
  "/logo.png",
  "/شگفت انگیز.svg",
  "/شگفت انگیز-1.svg",
];

// Vite development URLs to ignore
const IGNORED_PATHS = [
  "/@vite/client",
  "/@react-refresh",
  "/src/",
  "/@fs/",
  "/@id/",
  "/node_modules/",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        console.log("Opened cache");
        return cache.addAll(
          urlsToCache.map((url) => {
            if (url.startsWith("/public/")) {
              return url.replace("/public/", "/");
            }
            return url;
          })
        );
      })
      .catch((error) => {
        console.error("Cache addAll error:", error);
      })
  );
});

self.addEventListener("fetch", (event) => {
  // Skip Vite development URLs
  if (IGNORED_PATHS.some((path) => event.request.url.includes(path))) {
    return;
  }

  // Skip non-GET requests
  if (event.request.method !== "GET") {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response;
      }

      return fetch(event.request)
        .then((response) => {
          // Don't cache non-successful responses
          if (!response || response.status !== 200) {
            return response;
          }

          // Clone the response for caching
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });

          return response;
        })
        .catch(() => {
          // Return offline response
          return new Response("Offline", {
            status: 503,
            statusText: "Service Unavailable",
          });
        });
    })
  );
});
