import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { clientUri, orderUri, paymentUri, productUri } from "../LinkAPI";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setContext } from "@apollo/client/link/context";
// Hàm để lấy accessToken từ AsyncStorage
const getAccessToken = async () => {
    try {
        const jsonValue =await AsyncStorage.getItem('accessToken');
        console.log(jsonValue);
        return jsonValue;
    } catch (error) {
        console.error('Error getting accessToken:', error);
        return null;
    }
};
// Thêm accessToken vào headers sử dụng setContext
const authLink = setContext(async (_, { headers }) => {
    const accessToken = await getAccessToken();
    console.log('demo')
    console.log(accessToken)
    return {
        headers: {
            ...headers,
            authorization: accessToken ? `Bearer ${accessToken}` : '',
        },
    };
});
// Tạo một HTTP link kết nối đến API
const httpLinkClient = createHttpLink({
    uri: clientUri, // Thay thế bằng endpoint API của bạn
});
const httpLinkProduct = createHttpLink({
    uri: productUri, // Thay thế bằng endpoint API của bạn
});
const httpLinkOrder = createHttpLink({
    uri: orderUri, // Thay thế bằng endpoint API của bạn
});
const httpLinkPayment = createHttpLink({
    uri: paymentUri, // Thay thế bằng endpoint API của bạn
});
const client = new ApolloClient({
    link: authLink.concat(httpLinkClient),
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
    link: authLink.concat(httpLinkProduct),
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
    // link: authLink.concat(httpLinkOrder),
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
const payment = new ApolloClient({
    link: authLink.concat(httpLinkPayment),
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

export { client, product, order,payment };
