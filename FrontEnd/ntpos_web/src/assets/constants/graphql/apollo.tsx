// apollo.js

import {clientUri, orderUri} from '../LinkAPI';
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const cache = new InMemoryCache();
const httpLinkClient = createHttpLink({ uri: clientUri });
const httpLinkOrder = createHttpLink({ uri: orderUri });
const authLink = setContext((_, { headers }) => {
    return {
        headers: {
            ...headers,
            'Access-Control-Allow-Origin': '*' // Thay đổi miền trang web của bạn tại đây

        }
    };
});

// Kết hợp các link
const linkClient = authLink.concat(httpLinkClient);
const linkOrder = authLink.concat(httpLinkOrder);
const client = new ApolloClient({
    link: linkClient,
    name: 'react-web-client',
    cache: cache, // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    version: '1.3',
    queryDeduplication: false,
    defaultOptions :{
        watchQuery: {
            fetchPolicy: 'cache-and-network',
            errorPolicy: 'ignore',
        },
        query: {
            fetchPolicy: 'network-only',
            errorPolicy: 'all',
        },
        mutate: {
            errorPolicy: 'all',
        },
    }
});

const order = new ApolloClient({
    link: linkOrder,
    name: 'react-web-client',
    cache: cache, // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    version: '1.3',
    queryDeduplication: false,
    defaultOptions :{
        watchQuery: {
            fetchPolicy: 'cache-and-network',
            errorPolicy: 'ignore',
        },
        query: {
            fetchPolicy: 'network-only',
            errorPolicy: 'all',
        },
        mutate: {
            errorPolicy: 'all',
        },
    }
});

export { client,order };
