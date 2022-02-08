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
            validation: Rule => Rule.required(),
            options: {
                source: 'title',
                maxLength: 96,
            },
        },
        {
            name: "ingress",
            title: "Ingress",
            type: "text"
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
            name: "publishedAt",
            type: "datetime",
            title: "Publisert",
            validation: Rule => Rule.required(),
            description: "Set til en fremtidig dato for å publisere på valgt dato"
        },
        // {
        //     name: "owners",
        //     type: "reference",
        //     to: [{ type: "site" }]
        // }
    ]
}