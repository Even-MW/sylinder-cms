import React, { useEffect, useState } from 'react'

import imageUrlBuilder from '@sanity/image-url'
import { sanityClient } from "../../unil_web/lib/sanity"

const builder = imageUrlBuilder(sanityClient)

function urlFor(source) {
    return builder.image(source)
}

const ListPreview = ({ value }) => {
    const list = [1, 2, 3, 4]

    return <div style={{ display: "flex" }}>
        {list.map(item =>
            <div style={{ display: "flex", marginLeft: "8px", border: value?.[`listitem${item}b`] ? "1px solid lightgray" : "", borderRadius: "5px", padding: "4px", alignItems: "center", height: "40px" }}>
                <div style={{ width: "35px", height: "35px" }}>
                    {value?.[`listitem${item}b`] && <img src={urlFor(value?.[`listitem${item}b`]).width(50).url()} style={{ width: "35px", height: "35px" }} />}
                </div>
                <p style={{ marginLeft: "4px" }}>
                    {value?.[`listitem${item}a`] && value[`listitem${item}a`]}
                </p>
            </div>
        )}
    </div>

}

export default {
    name: "recipeBlock",
    title: "Legg til oppskrift",
    type: "object",
    fields: [
        {
            name: "recipeList",
            title: "Oppskrifts liste",
            description: "Her kan du legge opp til 4 oppskrifter sammen",
            type: "array",
            validation: Rule => Rule.max(4),
            of: [
                {
                    name: 'recipes',
                    type: 'reference',
                    to: [{ type: "recipe" }],
                },
            ]
        }
    ],
    preview: {
        select: {
            listitem1a: "recipeList.0.title",
            listitem1b: "recipeList.0.recipeImage",
            listitem2a: "recipeList.1.title",
            listitem2b: "recipeList.1.recipeImage",
            listitem3a: "recipeList.2.title",
            listitem3b: "recipeList.2.recipeImage",
            listitem4a: "recipeList.3.title",
            listitem4b: "recipeList.3.recipeImage",
        },
        component: ListPreview
    }
}