import { MdEmojiFoodBeverage, MdTapas } from "react-icons/md"

export const recipe = {
    name: "recipe",
    type: "document",
    title: "Oppskrift",
    icon: MdEmojiFoodBeverage,
    fields: [
        {
            name: "title",
            type: "string",
            title: "Navn"
        },
        {
            name: "slug",
            type: "slug",
            title: "Slug",
            validation: Rule => Rule.required(),
            options: {
                source: 'title',
                maxLength: 96,
            },
        },
        {
            name: "ingress",
            type: "text",
            title: "Ingress"
        },
        {
            name: "ingredients",
            title: "Ingredients",
            type: "array",
            of: [
                {
                    type: "object",
                    fields: [
                        {
                            name: "ingredient",
                            title: "Ingredient",
                            type: "string",
                        },
                        {
                            name: "wholeNumber",
                            title: "Helt tall",
                            type: "number",
                        },
                        {
                            name: "fraction",
                            title: "Decimal",
                            type: "string",
                            options: {
                                list: ["0,1", "0,2", "0,3", "0,4", "0,5", "0,6", "0,7", "0,8", "0,9"]
                            }
                        },
                        {
                            name: "unit",
                            title: "Enhet",
                            type: "string",
                            options: {
                                list: ["g", "ts", "ss", "dl", "l"]
                            }
                        }
                    ],
                    preview: {
                        select: {
                            title: "ingredient",
                            wholeNumber: "wholeNumber",
                            fraction: "fraction",
                            unit: "unit"
                        },
                        prepare({
                            title, wholeNumber = "", fraction = "", unit = ""
                        }) {
                            return {
                                title,
                                subtitle: `${wholeNumber} ${fraction} ${unit}`,
                                media: MdTapas
                            }
                        }
                    }
                }
            ],

        },
        {
            name: "instructions",
            title: "Instructions",
            type: "array",
            of: [{ type: "block" }]
        },
        {
            name: "recipeImage",
            type: "image",
            title: "Bilde"
        },
        {
            name: "videoUrl",
            type: "url",
            title: "Video url"
        },
        {
            name: "category",
            type: "string",
            title: "Kategori"
        },
        {
            name: "timeEstiamte",
            type: "array",
            title: "Tidsestimat",
            of: [
                { type: "string" }
            ],
            options: {
                list: [
                    { title: 'Under 20 minutter', value: 'Under 20 minutter' },
                    { title: '20-40 minutter', value: '20-40 minutter' },
                    { title: '40-60 minutter', value: '40-60minutter' },
                    { title: 'Over 60 minutter ', value: 'Over 60 minutter' }
                ]
            }
        },
        {
            name: "datefrom",
            type: "date",
            title: "Aktiv fra dato"
        },
        {
            name: "dateto",
            type: "date",
            title: "Aktiv til dato"
        },
        {
            name: "likes",
            title: "Likes",
            type: "number"
        }
    ],
    initalValues: {
        likes: 0,
    }
}