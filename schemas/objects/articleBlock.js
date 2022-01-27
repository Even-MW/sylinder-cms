import React from "react"
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
            <div style={{ display: "flex", marginLeft: "8px", border: value[`listitem${item}b`] ? "1px solid lightgray" : "", borderRadius: "5px", padding: "4px" }}>
                {value[`listitem${item}b`] && <img src={urlFor(value[`listitem${item}b`]).width(50).url()} />}
                <p style={{ marginLeft: "4px" }}>
                    {value[`listitem${item}a`] && value[`listitem${item}a`]}
                </p>
            </div>
        )}
    </div>

}

export default {
    name: "articleBlock",
    title: "Legg til artikkel",
    type: "object",
    fields: [
        {
            name: "articleList",
            type: "array",
            validation: Rule => Rule.max(4),
            of: [
                {
                    name: 'articles',
                    type: 'reference',
                    to: [{ type: "article" }],
                },
            ]
        }
    ],
    preview: {
        select: {
            listitem1a: "articleList.0.title",
            listitem1b: "articleList.0.mainImage.image",
            listitem2a: "articleList.1.title",
            listitem2b: "articleList.1.mainImage.image",
            listitem3a: "articleList.2.title",
            listitem3b: "articleList.2.mainImage.image",
            listitem4a: "articleList.3.title",
            listitem4b: "articleList.3.mainImage.image",
        },
        component: ListPreview
    }
}