import { extractUuid } from "../utils/extractUuid"

const BASE_URI = import.meta.env.VITE_API_URI

export const getByUuidHandler = async (url, name) => {
    const uuid = extractUuid(url, name)
    return caches.open(name)
    .then(async (cache) => {
      return cache.match(`${BASE_URI}/${name}`)
      .then(async (response) => {
        const text = await response.text()
        const forms = JSON.parse(text)
        const form = forms.find((form) => form.id === uuid)
        const responseBody = JSON.stringify(form)
        return new Response(`${responseBody}`, {
          headers: response.headers,
        });
      })
    })
}