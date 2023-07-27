const BASE_URI = import.meta.env.VITE_API_URI
const DEV = import.meta.env.DEV
import { cleanupOutdatedCaches, createHandlerBoundToURL, precacheAndRoute } from 'workbox-precaching'
import { clientsClaim } from 'workbox-core'
import { NavigationRoute, registerRoute } from 'workbox-routing'
import { StaleWhileRevalidate } from 'workbox-strategies';
import { getByUuidHandler } from './routeHandlers/getByUuidHandler'

// self.__WB_MANIFEST is default injection point
precacheAndRoute(self.__WB_MANIFEST)

// clean old assets
cleanupOutdatedCaches()

let allowlist
if (DEV)
  allowlist = [/^\/$/]

// to allow work offline
registerRoute(new NavigationRoute(
  createHandlerBoundToURL('index.html'),
  { allowlist },
))

self.skipWaiting()
clientsClaim()

registerRoute(
  new RegExp(`${BASE_URI}/forms(?:/time/independent)?$`), 
  new StaleWhileRevalidate({
    cacheName: 'forms'
}))

registerRoute(
  new RegExp(`${BASE_URI}/forms/+`), 
  ({url}) => getByUuidHandler(url, 'forms')
)

