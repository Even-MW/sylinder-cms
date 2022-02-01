import YouTube from "react-youtube"
import getYouTubeID from "get-youtube-id"
import styles from "../../styles/Article.module.css"
export default function YoutubeBlock({ url }) {
    const id = getYouTubeID(url)
    return (<YouTube videoId={id} className={styles.youtube} />)
}