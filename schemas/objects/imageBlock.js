export default {
    name: "imageBlock",
    type: "object",
    fields: [
        {
            name: "image",
            title: "Bilde",
            type: "image"
        },
        {
            name: "alt",
            type: "string",
            title: "Alt",
            hidden: ({ parent }) => !parent?.image,
            validation: Rule => Rule.required().error("Et bilde må ha en alt tekst")
        },
        {
            name: "description",
            type: "text",
            title: "Beskrivelse",
            rows: 3,
            hidden: ({ parent }) => !parent?.image
        }
    ]
}