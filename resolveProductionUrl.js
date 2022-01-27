export default function resolveProductionUrl(document) {
    return `http://localhost:3000/${document._type}/${document.slug.current}`
}