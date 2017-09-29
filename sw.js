self.addEventListener('fetch', function(event) {
  console.log('Request', event.request);

  const jsRegex = /.*\.js/;
  if (jsRegex.test(event.request.url)) {
    const injectScript = "alert('hello')";
    const resp = new Response(injectScript, {
      headers: {
        'Content-Type': 'application/javascript'
      }
    });
    event.respondWith(resp);
  }

  // const imgRegex = /.*\.jpg/;
  // if (imgRegex.test(event.request.url)) {
  //   const oldLogo = '/threatLogo.png';
  //   event.respondWith(fetch(oldLogo));
  // }
});
