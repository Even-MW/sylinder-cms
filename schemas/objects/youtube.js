// youtube.js
import React from 'react'
import YouTube from 'react-youtube'
import getYouTubeId from 'get-youtube-id'

const Preview = ({ value }) => {
    const { url } = value
    const id = getYouTubeId(url)
    return (<YouTube videoId={id} />)
}

export default {
    name: 'youtubeEmbed',
    type: 'object',
    title: 'YouTube Embed',
    fields: [
        {
            name: 'url',
            type: 'url',
            title: 'YouTube video URL'
        }
    ],
    preview: {
        select: {
            url: 'url'
        },
        component: Preview
    }
}