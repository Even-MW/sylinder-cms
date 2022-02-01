import {
    PortableText,
    sanityClient,
    urlFor,
    usePreviewSubscription
} from "../../lib/sanity"
import React, { useState } from 'react';

import styles from '../../styles/Recipe.module.css'

const recipeQuery = `*[_type == "recipe" && slug.current == $slug][0]{
    _id, 
    slug,
    title,
    description,
    recipeImage,
    ingredients[]{
        _key,
        unit,
        wholeNumber,
        fraction,
        ingredient
    },
    instructions,
    likes
}`

const path = "recipe"

export default function Recipe({ data, preview }) {
    const { data: recipe } = usePreviewSubscription(recipeQuery, {
        params: { slug: data?.recipe?.slug?.current, subpath: path },
        initialData: data,
        enabled: preview,
    })

    const [likes, setLikes] = useState(data?.recipe?.likes)

    const addLike = async () => {
        const res = await fetch("/api/handle-like", {
            method: "POST",
            body: JSON.stringify({ _id: recipe._id })
        }).catch((error) => console.log(error))

        const data = await res.json()
        setLikes(data.likes)
    }


    return (
        <article className={styles.recipe}>
            <main className={styles.recipecard}>
                <heading className={styles.heading}>
                    <h1>{recipe?.title}</h1>
                    {/* <button id="button" onClick={addLike} className={styles.likebutton}>
                        {likes} {likes !== 0 ? "🖤" : "💛"}
                    </button> */}
                </heading>
                <div>
                    <img className={styles.image} src={urlFor(recipe?.recipeImage).url()} />
                    <ul className={styles.ingredients}>
                        {recipe?.ingredients && <h3>Ingredienser</h3>}
                        {recipe?.ingredients?.map((ingredient) => (
                            <li key={ingredient._key} className={styles.ingredientitem}>
                                {ingredient?.wholeNumber}
                                {ingredient?.fraction}
                                {" "}
                                {ingredient?.unit}
                                {" "}
                                {ingredient?.ingredient}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className={styles.instructions}>
                    {recipe?.instructions && <PortableText blocks={recipe?.instructions} />}
                </div>
            </main>

        </article >
    );
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

    const recipe = await sanityClient.fetch(recipeQuery, { slug })
    return { props: { data: { recipe }, preview: true } }
}