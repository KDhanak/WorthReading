import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Login from '../components/login/login';
import Register from '../components/register/register';
import Layout from '../components/layout/layout';
import BookDescription from '../components/bookDescription/bookDescription';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                path: '/',
                element: <App />
            },
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/register',
                element: <Register />
            },
            {
                path: '/book/:bookId',
                element: <BookDescription />
            }
        ]
    }

])

export default router;
