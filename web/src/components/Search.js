import "./styles.scss"

import { SearchConfig, SearchContentType, SearchMode, SearchResult, SearchSuggestions } from "@ng-mw/shared-react-components/search"

import React from 'react';
import {
    SearchInput,
} from "@ng-mw/shared-react-components/search"
import sanityClient from "../../sanity"

const query = `*[]`


const Search = () => {
    // const [data, setData] = useState(null)
    // useEffect(() => {
    //     const fetchData = async () => {

    //         await sanityClient
    //             .fetch(query)
    //             .then((data) => setData(data))
    //             .catch(console.error);
    //     }

    //     fetchData()
    // }, []);

    const config = {
        identifier: "KJEDE.no",
        autoSuggest: true,
        skipOverview: false,
        mode: "spa",
        redirectUrl: "/components/DebugSearch?fullcomponent",
        include: [
            SearchContentType.ProductCategory,
            SearchContentType.Product,
            SearchContentType.Article,
            SearchContentType.Recipe,
            SearchContentType.Store,
        ],
    }

    return (
        <div>
            <SearchConfig config={config} />
            <SearchInput
                buttonText="Vis søkeresultat"
                isMain={false}
                placeholder="Søk etter varer"
                showEmptyButton={true}
            // onIdle={onIdle}
            // onActive={onActive}
            />
            {/* <SearchSuggestions
                showMoreLink
                customItemTemplates={USE_NEW_CONCEPT ? { [SearchContentType.Theme]: CustomThemeItemTemplate } : null}
                customFallbackSuggestions={USE_NEW_CONCEPT ? customFallbackSuggestions : null}
            /> */}
            <SearchResult
                useVerticalProductList
                onNewSearchTriggered={() => console.log("SearchResult -> onNewSearchTriggered!")}
            />
        </div>
    );
};

export default Search;