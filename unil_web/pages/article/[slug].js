import { PortableText, sanityClient, urlFor, usePreviewSubscription } from "../../lib/sanity"

import React from "react"
import YoutubeBlock from "../../components/youtubeBlock/youtubeBlock"
import styles from "../../styles/Article.module.css"

const articleQuery = `*[_type == "article" && slug.current == $slug][0]{
    _id,
    title,
    slug,
    mainImage,
    mainContent[]{
        ...,
        recipeList[]->{
            _id,
            slug,
            title,
            recipeImage,
            likes,
            timeEstiamte
        },
        articleList[]->{
            _id,
            slug,
            title,
            mainImage
        },
    },
    youtubeurl,
    ingress
}`

const path = "article"

export default function Article({ data, preview }) {
    const { data: article } = usePreviewSubscription(articleQuery, {
        params: { slug: data?.article?.slug?.current, subpath: path },
        initialData: data,
        enabled: preview,
    })

    return (
        <article className={styles.article}>
            <img className={styles.image} src={urlFor(article?.mainImage?.image).url()} alt={article?.mainImage?.alt} />
            <main className={styles.main}>
                <h1 className={styles.heading}>{article?.title}</h1>
                {article?.ingress && <p className={styles.ingress}>{article?.ingress}</p>}
                <br />
                {article?.mainContent && <PortableText blocks={article?.mainContent} />}
                {article?.youtubeurl && <YoutubeBlock url={article?.youtubeurl} />}
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