import { FC, useState } from 'react';
import {
	EuiButton,
	EuiButtonIcon,
	EuiFieldText,
	EuiFlexItem,
	EuiFlexGroup,
	EuiFilePicker
} from '@elastic/eui';
import './index.scss';
import { useMutation } from '@apollo/client';
import { ADD_MESSAGE, MutationRoot, MutationRootSendMsgArgs } from '../../types/api';

const ChatInput: FC = () => {
	const [message, setMessage] = useState<{
		username: string;
		text: string;
		image?: File | null | undefined;
	}>({
		username: '',
		text: '',
		image: undefined
	});
	const [sendMsg] = useMutation<MutationRoot, MutationRootSendMsgArgs>(ADD_MESSAGE, {
		variables: { username: message.username, msg: message.text, file: message.image }
	});
	const [imagePicker, setImagePicker] = useState<boolean>(false);
	const togglePicker = () => setImagePicker(!imagePicker);
	const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setMessage({ ...message, [event.target.name]: event.target.value });
	};
	const addMessage = async () => {
		try {
			await sendMsg();
			window.scrollTo(0, document.body.scrollHeight);
			setMessage({ ...message, text: '', image: undefined });
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<div className='chat-input'>
			{imagePicker && (
				<EuiFlexGroup>
					<EuiFlexItem>
						<EuiFilePicker
							accept='image/*'
							fullWidth
							onChange={async (files: FileList | null) => {
								if (files) setMessage({ ...message, image: files[0] });
							}}
						/>
					</EuiFlexItem>
				</EuiFlexGroup>
			)}
			<EuiFlexGroup>
				<EuiFlexItem grow={false}>
					<EuiFieldText
						placeholder='Username'
						name='username'
						value={message.username}
						onChange={onChange}
					/>
				</EuiFlexItem>
				<EuiFlexItem>
					<EuiFieldText
						fullWidth
						placeholder='Message'
						name='text'
						value={message.text}
						onChange={onChange}
					/>
				</EuiFlexItem>
				<EuiFlexItem grow={false}>
					<EuiFlexGroup alignItems='center'>
						<EuiFlexItem>
							<EuiButtonIcon iconType='image' onClick={togglePicker} aria-label='upload' />
						</EuiFlexItem>
						<EuiFlexItem>
							<EuiButton onClick={addMessage}>Send</EuiButton>
						</EuiFlexItem>
					</EuiFlexGroup>
				</EuiFlexItem>
			</EuiFlexGroup>
		</div>
	);
};

export default ChatInput;
