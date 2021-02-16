import { FC, useEffect, useContext } from 'react';
import { EuiFlexGroup, EuiFlexItem } from '@elastic/eui';
import { MainContext } from '../../components/MainContext.tsx';
import { useQuery, useSubscription } from '@apollo/client';
import Message, { MessageProps } from '../../components/Message';
import ChatInput from '../../components/ChatInput';
import { GET_MESSAGES, QueryRoot, SUBSCRIBE_TO_MESSAGES, SubscriptionRoot } from '../../types/api';
import './index.scss';

const Home: FC = () => {
	const { get, messages } = useContext(MainContext);
	const { data: queryData } = useQuery<QueryRoot>(GET_MESSAGES);
	const { data: subscriptionData } = useSubscription<SubscriptionRoot>(SUBSCRIBE_TO_MESSAGES);

	useEffect(() => {
		if (queryData) {
			const messagesData: MessageProps[] = queryData.messages.map(userObject => ({
				id: userObject.id,
				username: userObject.username,
				text: userObject.text,
				image: userObject.src
			}));
			get(messagesData);
		}
		if (subscriptionData) {
			get([
				...messages,
				{
					id: subscriptionData.subscribe.user?.id as string,
					username: subscriptionData.subscribe.user?.username as string,
					text: subscriptionData.subscribe.user?.text as string,
					image: subscriptionData.subscribe.user?.src as string
				}
			]);
		}
		// eslint-disable-next-line
	}, [queryData, subscriptionData]);

	return (
		<div className='home'>
			<div className='messages'>
				<EuiFlexGroup direction='column'>
					{messages.length > 0 &&
						messages.map(message => (
							<EuiFlexItem grow={true} key={message.id}>
								<Message {...message} />
							</EuiFlexItem>
						))}
				</EuiFlexGroup>
			</div>
			<ChatInput />
		</div>
	);
};

export default Home;
