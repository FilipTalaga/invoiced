/* Cache version */
const cacheName = 'v1';

/* Service worker event handlers */
const eventHandlers = {
    install: e => e.waitUntil(caches.open(cacheName).then(cache => cache.add('/'))),
    activate: e =>
        e.waitUntil(
            caches
                .keys()
                .then(cacheNames =>
                    Promise.all(
                        cacheNames
                            .filter(cache => cache !== cacheName)
                            .map(cache => caches.delete(cache))
                    )
                )
        ),
    fetch: e =>
        e.respondWith(
            fetch(e.request)
                .then(async res => {
                    const matches = matcher => res.type === 'basic' && !!res.url.match(matcher);

                    const isHTML = matches(/(\/[^.]*$|^$)/);
                    const isJs = matches(/\.js$/);
                    const isCss = matches(/\.css$/);
                    const isAsset = matches(/assets/);

                    /* Cache pages, scripts, styles and assets */
                    if (isHTML || isJs || isCss || isAsset) {
                        const response = res.clone();
                        const cache = await caches.open(cacheName);

                        /* Delete old bundles */
                        if (isJs) {
                            const keys = await cache.keys();

                            keys.filter(
                                ({ url }) => url !== response.url && url.match(/\.js$/)
                            ).forEach(key => cache.delete(key));
                        }

                        cache.put(e.request, response);
                    }

                    return res;
                })
                .catch(() => caches.match(e.request))
        ),
};

/* Hooking up listeners */
Object.entries(eventHandlers).map(([event, handler]) => self.addEventListener(event, handler));
