import { MdWeb } from "react-icons/md";

export const pageBuilder = {
    name: "pageBuilder",
    type: "document",
    title: "Alle sider",
    icon: MdWeb,
    fields: [
        {
            name: "headerImage",
            type: "image",
            title: "Hovedbilde",
            options: {
                hotspot: true
            }
        },
        {
            name: "title",
            type: "string",
            title: "Tittel"
        },
        {
            name: "slug",
            type: "slug",
            title: "Slug",
            options: {
                source: 'title',
                maxLength: 96,
            },
        },
        {
            name: "pageContent",
            title: "Hovedinnhold",
            type: "blockContent"
        }
    ]
}