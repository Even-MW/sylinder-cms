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

const path = "article"

export default function Article({ data, preview }) {

    console.log(data)

    const { data: article } = usePreviewSubscription(articleQuery, {
        params: { slug: data?.article?.slug?.current, subpath: path },
        initialData: data,
        enabled: preview,
    })

    // const { article } = data;

    return (
        <article>
            <img src={urlFor(article?.mainImage?.image).url()} />
            <h1>{article?.title}</h1>
            <p>{article?.ingress}</p>
            <br />
            <main style={{ border: "1px solid rgba(0, 0, 0, .2)", padding: "1em" }}>
                {article?.mainContent && <PortableText blocks={article?.mainContent} />}
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

    const article = await sanityClient.fetch(articleQuery, { slug })

    return { props: { data: { article }, preview: true } }
}