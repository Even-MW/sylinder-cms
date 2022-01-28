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
        ingredient->{
            name
        }
    },
    instructions,
    likes
}`

export default function Recipe({ data, preview }) {

    console.log(data)

    const { data: recipe } = usePreviewSubscription(recipeQuery, {
        params: { slug: data.recipe?.slug?.current },
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
        <article className={styles.card}>
            <h1>{recipe.title}</h1>
            <button onClick={addLike}>
                {likes} 💛
            </button>
            <main>
                <img className={styles.image} src={urlFor(recipe?.recipeImage).url()} />
                <div>
                    <ul>
                        {recipe.ingredients?.map((ingredient) => (
                            <li key={ingredient._key}>
                                {ingredient?.wholeNumber}
                                {ingredient?.fraction}
                                {" "}
                                {ingredient?.unit}
                                <br />
                                {ingredient?.ingredient.name}
                            </li>
                        ))}
                    </ul>
                    <PortableText blocks={recipe?.instructions} />
                </div>
            </main>

        </article>
    );
}

export async function getStaticPaths() {
    const paths = await sanityClient.fetch(
        `*[_type == "recipe" && defined(slug.current)]{
            "params": {
                "slug": slug.current
            }
        }`
    )

    return {
        paths,
        fallback: true,
    }
}

export async function getStaticProps({ params }) {
    const { slug } = params

    const recipe = await sanityClient.fetch(recipeQuery, { slug })
    return { props: { data: { recipe }, preview: true } }
}