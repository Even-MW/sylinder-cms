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

export default function PageBuilder({ data, preview }) {
    // const { page } = data

    // console.log(page)
    const { data: page } = usePreviewSubscription(pageBuilderQuery, {
        params: { slug: data.page?.slug?.current },
        initialData: data,
        enabled: preview
    })

    return (
        <article>
            <img src={urlFor(page?.headerImage).url()} alt={page.title} />
            <h1>{page.title}</h1>
            <main>
                <PortableText blocks={page.pageContent} />
            </main>
        </article>
    )


}

export async function getStaticPaths() {
    const paths = await sanityClient.fetch(`*[_type == "pageBuilder" && defined(slug.current)]{
        "params": {
            "slug": slug.current
        }
    }`)

    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps({ params }) {
    const { slug } = params
    const page = await sanityClient.fetch(pageBuilderQuery, { slug })

    return { props: { data: { page }, preview: true } }
}