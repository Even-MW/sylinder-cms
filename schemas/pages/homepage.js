export const homepage = {
    name: "homepage",
    type: "document",
    title: "Homepage",
    fields: [
        {
            title: "Title",
            name: "title",
            type: "string",
            validation: Rule => Rule.required().error("Title cannot be empty")
        },
        {
            title: 'Slug',
            name: 'slug',
            type: 'slug',
            options: {
                source: "title",
                maxLength: 96
            },
            validation: Rule => Rule.required().error("Slug cannot be empty")
        }
    ],
};
