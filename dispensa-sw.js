var cacheName = 'dispensa-v1.0';

self.addEventListener('install', function (event) {
  caches.open(cacheName).then((cache) => {
    cache.addAll([
      '/',
      '/index.html',
      '/manifest.webmanifest',
      '/estilo.css',
      '/script.js',
      '/imagens/delete.png',
      '/imagens/edit.png',
      '/imagens/plus0.png',
      '/imagens/plus1.png',
      '/imagens/icones/cookiejarfavicon.ico',
      '/imagens/icones/cookiejar48.png',
      '/imagens/icones/cookiejar72.png',
      '/imagens/icones/cookiejar96.png',
      '/imagens/icones/cookiejar144.png',
      '/imagens/icones/cookiejar192.png',
      '/imagens/icones/cookiejar152.png',
      '/imagens/icones/cookiejar180.png',
    ]);
  });
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key !== cacheName) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', function (event) { 
  let resposta = caches.open(cacheName).then((cache) => { 
    return cache.match(event.request).then((recurso) => { 
      if (recurso) return recurso; 
      return fetch(event.request).then((recurso) => { 
        cache.put(event.request, recurso.clone()); 
        return recurso; 
      }); 
    }); 
  }); 
  event.respondWith(resposta); 
}); 