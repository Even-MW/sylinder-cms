import styles from "../../styles/ArticleBlock.module.css"
import { urlFor } from "../../lib/sanity"
export default function ArticleBlock({ data }) {
    return (
        <article className={styles.main} style={{ "gridTemplateColumns": data.map(i => "1fr").join(" ") }}>
            {data.map(article => (
                <section key={article._id} className={styles.card}>
                    <img className={styles.image} src={urlFor(article?.mainImage?.image).url()} />
                    <span className={styles.category}>Lær mer</span>
                    <h2 className={styles.title}>{article.title}</h2>
                </section>
            ))}
        </article>
    )
}