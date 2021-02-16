import { FC } from 'react';
import MainContextProvider from '../MainContext.tsx';
import './index.scss';

const Wrapper: FC = ({ children }) => (
	<MainContextProvider>
		<div className='wrapper'>{children}</div>
	</MainContextProvider>
);

export default Wrapper;
