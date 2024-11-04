import './App.css';
import Helmet from 'react-helmet';
import NavBar from './components/navbar/navbar';
import Categories from './components/categories/categories';

function App() {
	return (
		<>
			<Helmet>
				<title>WorthReading</title>
				<meta name="description" content="Register to create an account on WorthReading." />
			</Helmet>
			<NavBar />
			<Categories />
		</>
	)
}

export default App
