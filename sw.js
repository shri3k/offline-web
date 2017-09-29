self.addEventListener('install', function(event) {
  const assets = ['/app.js', '/threatLogo.png'];

  const cacheAssets = caches.open('strat-v1').then(function(cache) {
    cache.addAll(assets);
  });
  event.waitUntil(cacheAssets);
});

// self.addEventListener('fetch', function(event) {
//   console.log('Request', event.request);
//
//   const jsRegex = /.*\.js/;
//   if (jsRegex.test(event.request.url)) {
//     const injectScript = "alert('hello')";
//     const resp = new Response(injectScript, {
//       headers: {
//         'Content-Type': 'application/javascript'
//       }
//     });
//     event.respondWith(resp);
//   }

// const imgRegex = /.*\.jpg/;
// if (imgRegex.test(event.request.url)) {
//   const oldLogo = '/threatLogo.png';
//   event.respondWith(fetch(oldLogo));
// }
// });
