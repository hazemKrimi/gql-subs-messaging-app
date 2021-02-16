import { FC, useReducer, createContext } from 'react';
import { MessageProps } from '../Message';

export const MainContext = createContext<{
	messages: MessageProps[];
	get: (messages: MessageProps[]) => void;
}>({
	messages: [],
	get: () => {}
});

const reducer = (state: MessageProps[], action: { type: 'GET'; payload: MessageProps[] }) => {
	switch (action.type) {
		case 'GET':
			return [...action.payload];
		default:
			return state;
	}
};

const MainContextProvider: FC = ({ children }) => {
	const [messages, dispatch] = useReducer(reducer, []);
	const get = (messages: MessageProps[]) => dispatch({ type: 'GET', payload: messages });

	return <MainContext.Provider value={{ messages, get }}>{children}</MainContext.Provider>;
};

export default MainContextProvider;
