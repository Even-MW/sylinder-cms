import { MdEmojiFoodBeverage, MdRule } from "react-icons/md"

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
                            type: "reference",
                            to: [{ type: "ingredient" }]
                        },
                        {
                            name: "wholeNumber",
                            title: "Whole Number",
                            type: "number",
                        },
                        {
                            name: "fraction",
                            title: "Fraction",
                            type: "string",
                            options: {
                                list: ["1/2", "1/3", "1/4", "3/4", "2/3"]
                            }
                        },
                        {
                            name: "unit",
                            title: "Unit",
                            type: "string",
                            options: {
                                list: ["gram", "kopp", "SS", "TS"]
                            }
                        }
                    ],
                    preview: {
                        select: {
                            title: "ingredient.name",
                            name: "ingredient.name",
                            media: "ingredient.image",
                            wholeNumber: "wholeNumber",
                            fraction: "fraction",
                            unit: "unit"
                        },
                        prepare({
                            title, subtitle, media, wholeNumber = "(No whole number set)", fraction = "(No fraction set)", unit = "(No unit set)"
                        }) {
                            return {
                                title,
                                subtitle: `${wholeNumber} ${fraction} ${unit}`,
                                media
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
                    { title: 'Under 20 minutter', value: 'under20min' },
                    { title: '20-40 minutter', value: '20to40min' },
                    { title: '40-60 minutter', value: '40to60min' },
                    { title: 'Over 60 minutter ', value: 'over60min' }
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