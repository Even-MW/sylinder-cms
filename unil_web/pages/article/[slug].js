import { PortableText, sanityClient, urlFor, usePreviewSubscription } from "../../lib/sanity"

import React from "react"

const articleQuery = `*[_type == "article" && slug.current == $slug][0]{
    _id,
    title,
    slug,
    mainImage,
    mainContent,
    youtubeurl,
    ingress
}`



export default function Article({ data, preview }) {

    const { data: article } = usePreviewSubscription(articleQuery, {
        params: { slug: data.article.slug.current },
        initialData: data,
        enabled: preview,
    })

    return (
        <article>
            <img src={urlFor(article?.mainImage?.image).url()} />
            <h1>{article?.title}</h1>
            <p>{article?.ingress}</p>
            <br />
            <main style={{ border: "1px solid rgba(0, 0, 0, .2)", padding: "1em" }}>
                <PortableText blocks={article?.mainContent} />

            </main>

        </article >
    )
}


export async function getStaticPaths() {
    const paths = await sanityClient.fetch(
        `*[_type == "article" && defined(slug.current)]{
            "params": {
                "slug": slug.current
            }
        }`
    )

    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps({ params }) {
    const { slug } = params

    const article = await sanityClient.fetch(articleQuery, { slug })

    return { props: { data: { article }, preview: true } }
}