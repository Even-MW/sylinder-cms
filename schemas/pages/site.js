import { MdStore, MdWeb } from "react-icons/md"

export default {
    name: "site",
    title: "Ny side",
    type: "document",
    icon: MdWeb,
    fields: [
        {
            name: "name",
            title: "Side navn",
            type: "string"
        },
        {
            name: "slug",
            title: "Slug",
            type: "slug",
            validation: Rule => Rule.required(),
            options: {
                source: 'siteName',
                maxLength: 96,
            },
        },
        {
            name: "description",
            title: "Beskrivelse",
            type: "text"
        },
    ]

}