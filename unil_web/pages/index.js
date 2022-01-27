import { sanityClient, urlFor } from '../lib/sanity'

import BlockContent from "@sanity/block-content-to-react"
import Head from 'next/head'
import Link from "next/link"
import YouTube from "react-youtube"
import getYouTubeID from "get-youtube-id"
import styles from '../styles/Home.module.css'

const pageQuery = `*[_type == "pageBuilder"] {title, slug, pageContent}`
const recipeQuery = `*[_type == "recipe"]`

const serializers = {
  types: {
    articleBlock: (props) => (
      <pre>{JSON.stringify(props, null, 2)}</pre>
    ),
    recipeBlock: (props) => (
      <pre>{JSON.stringify(props, null, 2)}</pre>
    ),
    youtubeEmbed: ({ node: { url } }) => {
      const id = getYouTubeID(url)
      return (
        <YouTube videoId={id} />)
    }

  },
}

export default function Home({ page, recipes }) {
  const singelPage = page[0]
  return (
    <div className={styles.container}>
      <Head>
        <title>Unil</title>
        <meta name="description" content="Unil" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <ul className={styles.grid}>
          {recipes?.length > 0 && recipes.map((recipe) => (
            <li key={recipe._id} className={styles.card}>
              <Link href={`/recipe/${recipe.slug.current}`}>
                <a>
                  <img src={urlFor(recipe.recipeImage).url()} />
                  <span>{recipe.title}</span>
                </a>
              </Link>
            </li>
          ))}
        </ul>
        <h2>{singelPage.title}</h2>
        <p>{singelPage.slug.current}</p>
        <BlockContent
          blocks={singelPage.pageContent}
          serializers={serializers}
          imageOptions={{ w: 320, h: 240, fit: 'max' }}
          {...sanityClient.config()}
        />
      </main >
    </div >
  )
}

export async function getStaticProps() {
  const page = await sanityClient.fetch(pageQuery)
  const recipes = await sanityClient.fetch(recipeQuery)

  return {
    props: {
      page,
      recipes
    }
  }
}
