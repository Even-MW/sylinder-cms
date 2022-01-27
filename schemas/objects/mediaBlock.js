export default {
    name: 'mediaBlock',
    title: 'Media block',
    type: "array",
    of: [
        {
            title: "Post",
            type: 'object',
            fields: [
                // {
                //     name: 'posts',
                //     title: 'Posts',
                //     type: 'reference',
                //     to: [{ type: 'post' }, { type: "recipe" }],
                // },
                {
                    name: "overrideTitle",
                    title: "Override Title",
                    type: "string",
                },
                {
                    title: 'Is this a recipe?',
                    name: 'isRecipe',
                    type: 'boolean'
                },
                {
                    name: "overrideIngress",
                    title: "Override ingress",
                    type: "text",
                },
                {
                    name: "overrideImage",
                    title: "Override image",
                    description: "If no image is providede it will use the header image of the article/post that were references",
                    type: "image",
                },
                {
                    title: 'Relativ size',
                    name: 'relativSize',
                    description: "This will determin the size of the media block on the page",
                    type: 'string',
                    options: {
                        list: [
                            { title: 'Small ', value: 'sm' },
                            { title: 'Medium', value: 'md' },
                            { title: 'Large', value: 'lg' },
                        ],
                    },
                },
            ],
        }
    ]
}