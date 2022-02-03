export default {
    widgets: [
        {
            name: 'document-list',
            options: {
                title: 'Sist oppdatert artikler',
                order: '_updatedAt desc',
                types: ['article'],
                createButtonText: 'Lag ny artikkel'
            }
        },
        {
            name: 'document-list',
            options: {
                title: 'Sist oppdatert oppskrifter',
                order: '_updatedAt desc',
                types: ['recipe'],
                createButtonText: 'Lag ny oppskrift'
            }
        },
        {
            name: 'project-info'
        },
        {
            name: 'project-users'
        }
    ]
}