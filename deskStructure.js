import { MdTapas, MdWeb } from 'react-icons/md'

import Iframe from "sanity-plugin-iframe-pane";
import S from '@sanity/desk-tool/structure-builder'
import documentStore from 'part:@sanity/base/datastore/document'
import { map } from 'rxjs/operators'
import resolveProductionUrl from "./resolveProductionUrl";

// We filter document types defined in structure to prevent
// them from being listed twice
const hiddenDocTypes = (listItem) => {
    console.log(listItem.spec.schemaType.fields)
    return !["pageBuilder", "media.tag", "site"].includes(listItem.getId())
};

export const getDefaultDocumentNode = () => {
    // Return all documents with just 1 view: the form
    return S.document().views([
        S.view.form(),
        S.view
            .component(Iframe)
            .options({
                url: (doc) => resolveProductionUrl(doc),
            })
            .title("Preview"),
    ])
}

const siteQuery = `*[_type == "site"]`

export default () =>
    documentStore.listenQuery(siteQuery).pipe(
        map((sites) =>
            S.list()
                .title('Innhold')
                .items(
                    [
                        S.listItem()
                            .title('Sider')
                            .icon(MdWeb)
                            .child(
                                S.documentTypeList('pageBuilder')
                                    .title('Sider')
                            ),
                        S.divider(),
                        ...S.documentTypeListItems().filter(hiddenDocTypes),
                        S.divider(),
                        S.listItem()
                            .title('Ny side')
                            .icon(MdWeb)
                            .child(
                                S.documentTypeList('site')
                                    .title('Ny side')
                            ),
                        // For every new site create a new list item with access to all listItems
                        ...sites.map((site) =>
                            S.listItem()
                                .title(site.name)
                                .child((pageId) => {
                                    console.log(pageId)
                                    return S.documentTypeList('article')
                                        .title('Artikkel')
                                        .filter('_type == $type && $pageId in owners[].name')
                                        .params({ type: 'article', pageId })
                                }
                                    // S.list()
                                    //     .title(site.name)
                                    //     .items([
                                    //         ...S.documentTypeListItems()
                                    //             .filter(hiddenDocTypes,)
                                    //         // .filter('$pageId in owners[]._ref')
                                    //         // .params({ pageId }),
                                    //     ])
                                )
                        )
                    ]
                )
        ))