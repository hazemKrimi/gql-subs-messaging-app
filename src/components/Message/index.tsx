import { EuiComment } from '@elastic/eui';
import { FC } from 'react';
import './index.scss';

export interface MessageProps {
	id: string;
	username: string;
	text: string;
	image?: string | ArrayBuffer | null;
}

const Message: FC<MessageProps> = ({ username, text, image }) => {
	return (
		<div className='message'>
			<EuiComment username={username}>
				{text && <p>{text}</p>}
				{image && (
					<img
						src={`https://${process.env.REACT_APP_SERVER as string}${image as string}`}
						alt='Message'
					/>
				)}
			</EuiComment>
		</div>
	);
};

export default Message;
