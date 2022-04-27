import { CacheableResponsePlugin } from "workbox-cacheable-response";
import { clientsClaim, skipWaiting } from "workbox-core";
import { ExpirationPlugin } from "workbox-expiration";
import { precacheAndRoute } from "workbox-precaching";
import { registerRoute } from "workbox-routing";
import {
  StaleWhileRevalidate,
  CacheFirst,
  NetworkFirst,
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
// registerRoute(
//   new RegExp (/https:\/\/firebasestorage.googleapis.com(.*)/g),
//   new StaleWhileRevalidate({
//     cacheName: "firebasestorage",
//     // plugins: [
//     //   new CacheableResponsePlugin({
//     //     statuses: [0, 200],
//     //   }),
//       // new ExpirationPlugin({
//       //   maxAgeSeconds: 60 * 60 * 24 * 365,
//       //   maxEntries: 30,
//       // }),
//   }),
// );
// registerRoute(
//   ({ url }) =>
//   url.origin === 'https://firestore.googleapis.com' ||
//   url.origin === 'https://firebasestorage.googleapis.com',
//   new CacheFirst({
//     cacheName: "firestore",
//     plugins: [
//       new CacheableResponsePlugin({ statuses: [200] }),
//     ],
//     matchOptions: {
//       ignoreSearch: true,
//       ignoreVary: true
//     }
// }),

// );
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
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 дней
      }),
    ],
  })
);
