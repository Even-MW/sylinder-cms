import T from '@sanity/base/initial-value-template-builder';

export default [
    // This is where you add the default values to the page when its first created.
    // Now the parent id has been added to the parents array
    T.template({
        id: 'article2',
        title: 'Article',
        schemaType: 'document',
        parameters: [{ name: 'pageId', type: 'string' }],
        value: params => ({
            owners: [{ _type: 'reference', _ref: params.pageId }]
        })
    }),
    ...T.defaults(),
]