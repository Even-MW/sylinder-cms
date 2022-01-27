import Iframe from "sanity-plugin-iframe-pane";
import { MdWeb } from 'react-icons/md'
import S from '@sanity/desk-tool/structure-builder'
import SeoPane from "sanity-plugin-seo-pane";
import resolveProductionUrl from "./resolveProductionUrl";

// We filter document types defined in structure to prevent
// them from being listed twice
const hiddenDocTypes = (listItem) =>
    !["pageBuilder", "media.tag"].includes(listItem.getId());

export const getDefaultDocumentNode = () => {
    // Return all documents with just 1 view: the form
    return S.document().views([
        S.view.form(),
        S.view
            .component(Iframe)
            .options({
                // Accepts an async function
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
                            .child(),
                    ),
                S.divider(),
                ...S.documentTypeListItems().filter(hiddenDocTypes)

            ]
        )