import styles from "../../styles/ArticleBlock.module.css"
import { urlFor } from "../../lib/sanity"
export default function ArticleBlock({ data }) {
    return (
        <article className={styles.main}>
            {data.map(article => (
                <section key={article._id} className={styles.card}>
                    <h1>{article.title}</h1>
                    <img className={styles.image} src={urlFor(article?.mainImage?.image).url()} />
                </section>
            ))}
        </article>
    )
}