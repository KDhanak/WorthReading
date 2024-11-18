import './App.css';
import Categories from './components/categories/categories';
import Books from './components/books/books';
import { Helmet } from 'react-helmet-async';

function App() {
	return (
		<>
			<Helmet>
				<title>WorthReading</title>
				<meta name="description" content="Register to create an account on WorthReading." />
			</Helmet>
			<Categories />
			<Books />
		</>
	)
}

export default App;
