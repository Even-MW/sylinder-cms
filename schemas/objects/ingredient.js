import { MdTapas } from "react-icons/md";

export default {
    name: "ingredient",
    title: "Ingredient",
    type: "document",
    icon: MdTapas,
    fields: [
        {
            name: "name",
            title: "Ingredient name",
            type: "string",
        },
        {
            name: "image",
            title: "Image",
            type: "image",
            option: {
                hotspot: true
            }
        },
        {
            name: "notes",
            title: "Notes",
            type: "text"
        }
    ]
}