import styles from "../../styles/RecipeBlock.module.css"
import { urlFor } from "../../lib/sanity"

export default function RecipeBlock({ data }) {
    return (
        <article className={styles.main}>
            {data.map(recipe => (
                <section key={recipe._id} className={styles.card}>
                    <img className={styles.image} src={urlFor(recipe.recipeImage).url()} />
                    <h1>{recipe.title}</h1>
                    <p>Antall liker: {recipe.likes}</p>
                </section>
            ))}
        </article>
    )
}