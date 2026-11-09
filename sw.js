/**
 * sw.js — Service Worker for MS Student Platform PWA
 * Version: ms-platform-v17
 * Caches core shell assets and modular JSON catalogs for reliable offline studying.
 */

const CACHE_NAME = 'ms-platform-v17';

const STATIC_ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './css/variables.css',
  './css/main.css',
  './css/exam-vue.css',
  './js/app.js',
  './js/state.js',
  './js/storage.js',
  './js/examEngine.js',
  './js/ui.js',
  './js/icons.js',
  './js/i18n.js',
  './data/az900.json',
  './data/dp900.json',
  './data/dp600.json',
  './data/dp700.json',
  './data/pl300.json',
  './data/ab650.json',
  './data/ai901.json',
  './data/ab900.json',
  './data/dp800.json',
  './data/sc200.json',
  './data/questions.json',
  './data/en/az900.json',
  './data/en/dp900.json',
  './data/en/dp600.json',
  './data/en/dp700.json',
  './data/en/pl300.json',
  './data/en/ab650.json',
  './data/en/ai901.json',
  './data/en/ab900.json',
  './data/en/dp800.json',
  './data/en/sc200.json',
  './data/en/questions.json',
  './icons/icon-192.png',
  './icons/icon-512.png'
];

// Install: precache application shell and activate immediately
self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    })
  );
});

// Activate: cleanup outdated caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Skip waiting message listener for instant in-app update banner
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// Fetch: Stale-while-revalidate for local assets, ignore live MCP proxy API
self.addEventListener('fetch', (event) => {
  // Ignore API requests or non-GET
  if (event.request.method !== 'GET' || !event.request.url.startsWith(self.location.origin) || event.request.url.includes('/api/')) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      const fetchPromise = fetch(event.request).then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        return networkResponse;
      }).catch(() => cachedResponse);

      return cachedResponse || fetchPromise;
    })
  );
});
