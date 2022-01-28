import ArticleBlock from "../components/articleBlock/articleBlock"
import RecipeBlock from "../components/recipeBlock/recipeBlock"
import YouTube from "react-youtube"
import getYouTubeID from "get-youtube-id"

export const serializers = {
    types: {
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
        }
    },
}