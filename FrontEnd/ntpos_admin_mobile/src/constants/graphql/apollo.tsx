// apollo.js

import { ApolloClient, InMemoryCache } from '@apollo/client';
import { clientUri, productUri } from '../LinkAPI';

const client = new ApolloClient({
    uri: clientUri,
    cache: new InMemoryCache(),
    defaultOptions: {
        watchQuery: {
            fetchPolicy: 'no-cache',
        },
        query: {
            fetchPolicy: 'no-cache',
        },
        mutate: {
            fetchPolicy: 'no-cache',
        },
    },
});
const product = new ApolloClient({
    uri: productUri,
    cache: new InMemoryCache(),
    defaultOptions: {
        watchQuery: {
            fetchPolicy: 'no-cache',
        },
        query: {
            fetchPolicy: 'no-cache',
        },
        mutate: {
            fetchPolicy: 'no-cache',
        },
    },
});

export { client, product };
