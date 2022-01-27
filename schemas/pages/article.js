import { MdArticle } from 'react-icons/md'

export const article = {
    name: "article",
    type: "document",
    title: "Artikkel",
    icon: MdArticle,
    fields: [
        {
            name: "title",
            type: "string",
            title: "Tittel"
        },
        {
            name: 'slug',
            type: 'slug',
            title: 'Slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
        },
        {
            name: "mainImage",
            type: "imageBlock",
            title: "Hovedbilde"
        },
        {
            name: 'mainContent',
            title: 'Hovedinnhold',
            type: 'blockContent',
        },
        {
            name: "youtubeurl",
            title: "Youtube video",
            type: "url"
        },
        {
            name: "ingress",
            title: "Ingress",
            type: "text"
        }
    ]
}