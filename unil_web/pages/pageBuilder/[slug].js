import { PortableText, sanityClient, urlFor, usePreviewSubscription } from "../../lib/sanity"

import Image from "next/image"

const pageBuilderQuery = `*[_type == "pageBuilder" && slug.current == $slug][0]{
    _id,
    title,
    slug,
    headerImage,
    pageContent[]{
        ...,
        recipeList[]->{
            _id,
            slug,
            title,
            recipeImage,
            likes
        },
        articleList[]->{
            _id,
            slug,
            title,
            mainImage
        },
    }
}`

const path = "pageBuilder"

export default function PageBuilder({ data, preview }) {
    const { data: page } = usePreviewSubscription(pageBuilderQuery, {
        params: { slug: data?.page?.slug?.current, subpath: path },
        initialData: data,
        enabled: preview
    })

    return (
        <article>
            <img src={urlFor(page?.headerImage).url()} alt={page?.title} />
            <h1>{page?.title}</h1>
            <main>
                {page?.pageContent && <PortableText blocks={page.pageContent} />}
            </main>
        </article>
    )


}

export async function getStaticPaths() {
    const allSlugsQuery = `[*[defined(slug.current)][].slug.current]`
    const pages = await sanityClient.fetch(allSlugsQuery)

    return {
        paths: pages.map((slug) => `/${path}/${slug}`),
        fallback: true,
    }
}

export async function getStaticProps({ params }) {
    const { slug } = params
    const page = await sanityClient.fetch(pageBuilderQuery, { slug })

    return { props: { data: { page }, preview: true } }
}