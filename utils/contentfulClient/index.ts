import { createClient, ContentfulClientApi } from 'contentful';
import { useMemo } from 'react';

let contentfulClient: ContentfulClientApi;

const createContentfulClient = () => {
    return createClient({
        space: '1hz59jvvggjc',
        accessToken: 'gz-9DFRjRhIkcVQb1n0bcaRpOUGSQXDogkvloNPeh1s',
    });
}

const initContentful = (initState = null): ContentfulClientApi => {
    const isSSR = typeof window === 'undefined';
    let _contentfulClient;
    if (isSSR) {
        _contentfulClient = createContentfulClient();
        return createContentfulClient();
    } else {
        if (!contentfulClient) {
            contentfulClient = createContentfulClient();
        }
        return contentfulClient;
    }
}

const useContentful = (initState) => {
    const store = useMemo(() => initContentful(initState), [initState]);
    return store;
}

export default { initContentful, useContentful };

