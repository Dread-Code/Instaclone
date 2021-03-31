import { ApolloClient, InMemoryCache, split } from '@apollo/client'
import { HttpLink } from 'apollo-link-http'
import { getMainDefinition } from '@apollo/client/utilities';
import { WebSocketLink } from '@apollo/client/link/ws';
import { createUploadLink } from 'apollo-upload-client'
import { setContext } from 'apollo-link-context'
import { getToken } from '../utils/token'


// Create HTTP link that will be used for queries and mutations
const httpLink = new createUploadLink({
    uri: "http://localhost:4000/", // use https for secure endpoint
  });
  
  // Create Websocket link that will be used for subscriptions
  const wsLink = new WebSocketLink({
    uri: "ws://localhost:4000/graphql", // use wss for a secure endpoint
    options: {
      reconnect: true
    }
  });
  
  wsLink.subscriptionClient.onReconnected(() => console.log("Reconnected"))
  
  // Subscription middleware that adds token to each subscription request
  const subscriptionAuthMiddleware = {
    applyMiddleware: async (options, next) => {
      options.authToken = getToken()
      next()
    }
  }
  
  // Add the subscription auth middleware to the web socket link
  wsLink.subscriptionClient.use([subscriptionAuthMiddleware])
  
  // Using the ability to split links, you can send data to each link
  // depending on what kind of operation is being sent
  const link = split(
    // split based on operation type
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
      );
    },
    wsLink,
    httpLink,
  );
  
  // Middleware to pass token in each HTTP request
  const httpAuthLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = getToken()
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        Authorization: token ? `Bearer ${token}` : ""
      }
    }
  });
  
  // Instantiate client
  const client = new ApolloClient({
    cache: new InMemoryCache({ addTypename: false }),
    link: httpAuthLink.concat(link)
  });

// const httpLik = HttpLink({
//     uri: 'http://localhost:4000/'
// })

// const wsLink = new WebSocketLink({
//     uri: 'ws://localhost:4000/subscriptions',
//     options: {
//       reconnect: true,
//     }
//   });


// wsLink.subscriptionClient.onReconnected(() => console.log("Reconnected"))

// // Subscription middleware that adds token to each subscription request
// const subscriptionAuthMiddleware = {
//     applyMiddleware: async (options, next) => {
//       options.authToken = getToken()
//       next()
//     }
//   }


// // Add the subscription auth middleware to the web socket link
// wsLink.subscriptionClient.use([subscriptionAuthMiddleware])

// const splitLink = split(
//   ({ query }) => {
//     const definition = getMainDefinition(query);
//     return (
//       definition.kind === 'OperationDefinition' &&
//       definition.operation === 'subscription'
//     );
//   },
//   wsLink,
//   httpLik,
// );



// const authLink = setContext((_, { headers }) => {
//     const token = getToken()
//     return {
//         headers:{
//             ...headers,
//             Authorization: token ? `Bearer ${token}`: ""
//         }
//     }
// })

// const client = new ApolloClient({
//     connectToDevTools: true,
//     cache: new InMemoryCache(),
//     link: authLink.concat(splitLink)
// })

export default client