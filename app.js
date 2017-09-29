(function(win) {
  const sw = navigator.serviceWorker;
  sw
    .register('./sw.js' /*, { scope: ‘<relative_pathname>’ } */)
    .then(function(registration) {
      console.log('Registered', registration);
    })
    .catch(function(err) {
      consle.error('failed', err);
    });

  // Regular app logic
  let switchText = true;
  const texts = ['hello world', 'good bye'];
  document.querySelector('h1').addEventListener('click', function(e) {
    this.textContent = texts[Number(switchText)];
    switchText = !switchText;
  });
})(window);
