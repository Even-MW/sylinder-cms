export default function resolveProductionUrl(document) {
    // return `http://localhost:3000/${document._type}/${document.slug.current}`
    return `https://unil-evenmauland-hus.vercel.app/${document._type}/${document.slug.current}`
}