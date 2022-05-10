import { CacheableResponsePlugin } from "workbox-cacheable-response";
import { clientsClaim, skipWaiting } from "workbox-core";
import { ExpirationPlugin } from "workbox-expiration";
import { precacheAndRoute } from "workbox-precaching";
import { registerRoute } from "workbox-routing";
import {
  CacheFirst,
} from "workbox-strategies";

declare let self: ServiceWorkerGlobalScope & typeof globalThis;

clientsClaim();
skipWaiting();

precacheAndRoute(self.__WB_MANIFEST);

registerRoute(
  ({ request }) =>
    request.destination === "script" || request.destination === "style",
  new CacheFirst({
    cacheName: "static-resources",
  })
);
registerRoute(
  ({ url }) =>
    url.origin === "https://fonts.googleapis.com" ||
    url.origin === "https://fonts.gstatic.com",
  new CacheFirst({
    cacheName: "google-fonts",
    plugins: [new ExpirationPlugin({ maxEntries: 20 })],
  })
);

registerRoute(
  ({ request }) => request.destination === "image",
  new CacheFirst({
    cacheName: "images",
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new ExpirationPlugin({
        maxAgeSeconds: 30 * 24 * 60 * 60,
      }),
    ],
  })
);
