// apollo.js

import { ApolloClient, InMemoryCache } from '@apollo/client';
import { clientUri, orderUri, productUri } from '../LinkAPI';

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
const order = new ApolloClient({
    uri: orderUri,
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

export { client, product, order };
