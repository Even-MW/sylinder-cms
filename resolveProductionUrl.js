// export default function resolveProductionUrl(document) {
//     // return `http://localhost:3000/${document._type}/${document.slug.current}`
//     return `https://unil-evenmauland-hus.vercel.app/${document._type}/${document.slug.current}`
// }

// Any random string, must match SANITY_PREVIEW_SECRET in the Next.js .env.local file
const previewSecret = 'zPpRwMUaYA9PbkVHjpix'

// Replace `remoteUrl` with your deployed Next.js site
const remoteUrl = `https://unil-evenmauland-hus.vercel.app/`
const localUrl = `http://localhost:3000`

export default function resolveProductionUrl(doc) {
    const baseUrl = window.location.hostname === 'localhost' ? localUrl : remoteUrl
    const previewUrl = new URL(baseUrl)

    previewUrl.pathname = `/api/preview`
    previewUrl.searchParams.append(`secret`, previewSecret)
    previewUrl.searchParams.append('subpath', doc._type)
    previewUrl.searchParams.append(`slug`, doc?.slug?.current ?? `/`)

    return previewUrl.toString()
}