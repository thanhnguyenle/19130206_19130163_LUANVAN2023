import {ApolloClient, createHttpLink, InMemoryCache} from '@apollo/client';
import {linkClient, linkOrder, linkPayment, linkProduct} from './link';
import {setContext} from "@apollo/client/link/context";
import AsyncStorage from "@react-native-async-storage/async-storage";
const getAccessToken = async () => {
    try {
        const jsonValue =await AsyncStorage.getItem('accessToken');
        return jsonValue;
    } catch (error) {
        console.error('Error getting accessToken:', error);
        return null;
    }
};
const authLink = setContext(async (_, { headers }) => {
    const accessToken = await getAccessToken();
    return {
        headers: {
            ...headers,
            authorization: accessToken ? `Bearer ${accessToken}` : '',
        },
    };
});
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
const httpLinkProduct = createHttpLink({
    uri: linkProduct, // Thay thế bằng endpoint API của bạn
});
const product = new ApolloClient({
    uri:linkProduct,
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
const payment = new ApolloClient({
    uri:linkPayment,
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
const client = new ApolloClient({
    uri:linkClient,
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
export { order ,product,payment,client};
