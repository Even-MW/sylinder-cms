import { MdTapas, MdWeb } from 'react-icons/md'

import Iframe from "sanity-plugin-iframe-pane";
import S from '@sanity/desk-tool/structure-builder'
import resolveProductionUrl from "./resolveProductionUrl";

// We filter document types defined in structure to prevent
// them from being listed twice
const hiddenDocTypes = (listItem) =>
    !["pageBuilder", "media.tag", "ingredient"].includes(listItem.getId());

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
export default () =>
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
                    .title('Ingredienser')
                    .icon(MdTapas)
                    .child(
                        S.documentTypeList('ingredient')
                            .title('Ingredienser')
                    ),
            ]
        )