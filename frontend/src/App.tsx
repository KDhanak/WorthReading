import './App.css';
import Helmet from 'react-helmet';
import NavBar from './components/navbar/navbar';

function App() {
	return (
		<>
			<Helmet>
				<title>WorthReading</title>
				<meta name="description" content="Register to create an account on MyApp." />
			</Helmet>
			<NavBar />
		</>
	)
}

export default App
