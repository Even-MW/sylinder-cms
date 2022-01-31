import { PortableText, sanityClient, urlFor } from '../lib/sanity'

// import BlockContent from "@sanity/block-content-to-react"
import Head from 'next/head'
import Link from "next/link"
import YouTube from "react-youtube"
import getYouTubeID from "get-youtube-id"
import styles from '../styles/Home.module.css'

const pageQuery = `*[_type == "pageBuilder"] {_id, title, slug}`
const recipeQuery = `*[_type == "recipe"]{_id, title, slug, recipeImage}`
const articleQuery = `*[_type == "article"]{_id, title, slug}`

export default function Home({ pages, recipes, articles }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Unil</title>
        <meta name="description" content="Unil" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h2>Pages:</h2>
        <ul className={styles.grid}>
          {pages?.length > 0 && pages.map((page) => (
            <li key={page._id} className={styles.card}>
              <Link href={`/pageBuilder/${page?.slug?.current}`}>
                <a>
                  <span>{page.title}</span>
                </a>
              </Link>
            </li>
          ))}
        </ul>
        <h2>Recipes: </h2>
        <ul className={styles.grid}>
          {recipes?.length > 0 && recipes.map((recipe) => (
            <li key={recipe._id} className={styles.card}>
              <Link href={`/recipe/${recipe?.slug?.current}`}>
                <a>
                  <img src={urlFor(recipe.recipeImage).url()} />
                  <span>{recipe.title}</span>
                </a>
              </Link>
            </li>
          ))}
        </ul>
        <h2>Articles:</h2>
        <ul className={styles.grid}>
          {articles?.length > 0 && articles.map((article) => (
            <li key={article._id} className={styles.card}>
              <Link href={`/article/${article?.slug?.current}`}>
                <a>
                  <span>{article.title}</span>
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </main >
    </div >
  )
}

export async function getStaticProps() {
  const pages = await sanityClient.fetch(pageQuery)
  const recipes = await sanityClient.fetch(recipeQuery)
  const articles = await sanityClient.fetch(articleQuery)

  return {
    props: {
      pages,
      recipes,
      articles,
    }
  }
}
