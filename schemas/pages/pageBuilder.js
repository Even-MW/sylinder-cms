import { MdWeb } from "react-icons/md";

export const pageBuilder = {
    name: "pageBuilder",
    type: "document",
    title: "Alle sider",
    icon: MdWeb,
    fields: [
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