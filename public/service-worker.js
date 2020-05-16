importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');
 
if (workbox){
    console.log(`Workbox berhasil dimuat`);
}
else{
    console.log(`Workbox gagal dimuat`);
}

workbox.precaching.precacheAndRoute([
    { url: '/', revision: '1' },
    { url: '/index.html', revision: '1' },
    { url: '/standing.html', revision: '1' },
    { url: '/team.html', revision: '1' },
    { url: '/nav.html', revision: '1' },
    { url: '/manifest.json', revision: '1'},
    { url: '/app.js', revision: '1' },
    { url: '/apple_icon_192x192.png', revision: '1' },
    { url: '/icon_192x192.png', revision: '1' },
    { url: '/icon_512x512.png', revision: '1' },
    { url: '/assets/css/style.css', revision: '1' },
    { url: '/assets/js/api.js', revision: '1' },
    { url: '/assets/js/db.js', revision: '1' },
    { url: '/assets/js/idb.js', revision: '1' },
    { url: '/assets/js/materialize.min.js', revision: '1' },
    { url: '/assets/js/nav.js', revision: '1' },
    { url: '/assets/components/index.js', revision: '1' },
    { url: '/assets/components/standing.js', revision: '1' },
    { url: '/assets/components/team.js', revision: '1' }
]);

workbox.routing.registerRoute(
    new RegExp('/assets/page/'),
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'pages'
    })
);

workbox.routing.registerRoute(
    new RegExp('/index.html'),
    workbox.strategies.cacheFirst()
);

workbox.routing.registerRoute(
    new RegExp('/team.html'),
    workbox.strategies.cacheFirst()
);

workbox.routing.registerRoute(
    new RegExp('/standing.html'),
    workbox.strategies.cacheFirst()
);

workbox.routing.registerRoute(
    /\.(?:png|gif|jpg|jpeg|svg)$/,
    workbox.strategies.cacheFirst({
        cacheName: 'images',
        plugins: [
            new workbox.expiration.Plugin({
                maxEntries: 60,
                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 hari
            }),
        ],
    }),
);

workbox.routing.registerRoute(
    new RegExp('https://api.football-data.org/v2/'),
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'football-api'
    })
)

workbox.routing.registerRoute(
    /^https:\/\/fonts\.googleapis\.com/,
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'google-fonts-stylesheets',
    })
);

// Menyimpan cache untuk file font selama 1 tahun
workbox.routing.registerRoute(
    /^https:\/\/fonts\.gstatic\.com/,
    workbox.strategies.cacheFirst({
        cacheName: 'google-fonts-webfonts',
        plugins: [
            new workbox.cacheableResponse.Plugin({
                statuses: [0, 200],
            }),
            new workbox.expiration.Plugin({
                maxAgeSeconds: 60 * 60 * 24 * 365,
                maxEntries: 30,
            }),
        ],
    })
);

workbox.routing.registerRoute(
    new RegExp('/assets/css/'),
    workbox.strategies.cacheFirst()
);

workbox.routing.registerRoute(
    new RegExp('/assets/js/materialize.min.js'),
    workbox.strategies.cacheFirst()
);


self.addEventListener('push', function(event) {
    let body;
    if (event.data) {
        body = event.data.text();
    } else {
        body = 'Push message no payload';
    }
    const options = {
        body: body,
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        }
    };
    event.waitUntil(
        self.registration.showNotification('Notification', options)
    );
});