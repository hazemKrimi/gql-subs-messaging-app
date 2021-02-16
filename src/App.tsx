import { FC } from 'react';
import { Route, Switch } from 'react-router-dom';
import Wrapper from './components/Wrapper';
import Home from './pages/Home';

const App: FC = () => {
	return (
		<Wrapper>
			<Switch>
				<Route path='/' exact>
					<Home />
				</Route>
			</Switch>
		</Wrapper>
	);
};

export default App;
