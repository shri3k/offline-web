const CACHE_NAME = 'strat-v2';
self.addEventListener('install', function(event) {
  const assets = ['/', '/index.html', '/app.js', '/threatLogo.png'];

  const cacheAssets = caches.open(CACHE_NAME).then(function(cache) {
    return cache.addAll(assets);
  });
  event.waitUntil(cacheAssets);
});

self.addEventListener('activate', function(event) {
  event.waitUntil(caches.delete('strat-v1'));
  // event.skipWaiting();
});

self.addEventListener('fetch', function(event) {
  console.log('Request', event.request.url);

  const fromCache = caches.open(CACHE_NAME).then(function(cache) {
    return caches
      .match(event.request)
      .then(function(resp) {
        if (resp) {
          console.log('Fetching from cache', resp.url);
          return resp;
        }
        return fetchFromServer(event.request);
      })
      .catch(err => console.error('failed on match', err));
  });

  event.respondWith(fromCache);
});

function fetchFromServer(url) {
  return fetch(url)
    .then(function(resp) {
      if (!resp.ok) {
        throw Error(resp.statusText);
      }
      return resp;
    })
    .catch(function(err) {
      console.error('failed to fetch', err);
    });
}
