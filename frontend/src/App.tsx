import './App.css';
import Helmet from 'react-helmet';
import Categories from './components/categories/categories';
import Books from './components/books/books';
import BookDescription from './components/bookDescription/bookDescription';

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
