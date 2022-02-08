import styles from "../../styles/RecipeBlock.module.css"
import { urlFor } from "../../lib/sanity"

export default function RecipeBlock({ data }) {
    return (
        <article className={styles.main} style={{ "gridTemplateColumns": data.map(i => "1fr").join(" ") }}>
            {data.map(recipe => (
                <section key={recipe._id} className={styles.card}>
                    <a href={`/recipe/${recipe?.slug?.current}`} className={styles.link}>
                        <img className={styles.image} src={urlFor(recipe?.recipeImage).url()} />
                        <div className={styles.text}>
                            <h1>{recipe.title}</h1>
                            <span className={styles.time}>{recipe.timeEstiamte}</span>
                        </div>
                    </a>
                </section>
            ))}
        </article>
    )
}