import ArticleBlock from "../components/articleBlock/articleBlock"
import RecipeBlock from "../components/recipeBlock/recipeBlock"
import YouTube from "react-youtube"
import getYouTubeID from "get-youtube-id"
import { urlFor } from "./sanity"

export const serializers = {
    types: {
        imageBlock: ({ node: { image } }) => {
            return <img src={urlFor(image).url()} />
        },
        articleBlock: ({ node: { articleList } }) => (
            <ArticleBlock data={articleList} />
        ),
        recipeBlock: ({ node: { recipeList } }) => (
            <RecipeBlock data={recipeList} />
        ),
        youtubeEmbed: ({ node: { url } }) => {
            const id = getYouTubeID(url)
            return (
                <YouTube videoId={id} />
            )
        },
    },
    marks: {
        link: ({ children, mark }) => {
            const rel = !mark.href.startsWith('/') ? 'noreferrer noopener' : undefined
            return (
                <a href={mark.href} rel={rel}>
                    {children}
                </a>
            )
        },
    },
}