import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache, split } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { WebSocketLink } from '@apollo/client/link/ws';
import { createUploadLink } from 'apollo-upload-client';
import App from './App';
import '@elastic/eui/dist/eui_theme_dark.css';
import './index.scss';

const wsLink = new WebSocketLink({
	uri: `wss://${process.env.REACT_APP_SERVER}`,
	options: {
		reconnect: true
	}
});

const splitLink = split(
	({ query }) => {
		const definition = getMainDefinition(query);
		return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
	},
	wsLink,
	createUploadLink({ uri: `https://${process.env.REACT_APP_SERVER}` })
);

const client = new ApolloClient({
	link: splitLink,
	cache: new InMemoryCache()
});

ReactDOM.render(
	<React.StrictMode>
		<BrowserRouter>
			<ApolloProvider client={client}>
				<App />
			</ApolloProvider>
		</BrowserRouter>
	</React.StrictMode>,
	document.getElementById('root')
);
