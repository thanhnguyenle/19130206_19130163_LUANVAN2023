import { ApolloClient, InMemoryCache } from '@apollo/client';
import { linkOrder } from './link';
const order = new ApolloClient({
    uri: linkOrder,
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
export { order };