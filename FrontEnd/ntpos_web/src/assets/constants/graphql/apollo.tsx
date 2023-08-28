// apollo.js

import {clientUri, inventoryUri, orderUri, productUri} from '../LinkAPI';
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import inventory from "../../../reducer/inventory";

const cache = new InMemoryCache();
const httpLinkClient = createHttpLink({ uri: clientUri });
const httpLinkOrder = createHttpLink({ uri: orderUri });
const httpLinkProduct = createHttpLink({ uri: productUri });
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
const linkProduct = authLink.concat(httpLinkOrder);
const client = new ApolloClient({
    // link: linkClient,
    uri:clientUri,
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
    uri: orderUri,
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
const product = new ApolloClient({
    // link: linkProduct,
    uri:productUri,
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
const inventory1 = new ApolloClient({
    // link: linkProduct,
    uri:inventoryUri,
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
export { client,order ,product,inventory1};
