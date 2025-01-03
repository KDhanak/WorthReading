import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Login from '../components/login/login';
import Register from '../components/register/register';
import Layout from '../components/layout/layout';
import BookDescription from '../components/bookDescription/bookDescription';
import Cart from '../components/cart/cart';
import Wishlist from '../components/wishlist/wishlist';

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
            },
            {
                path: '/cart',
                element: <Cart />
            },
            {
                path: '/wishlist',
                element: <Wishlist />
            }
        ]
    }

])

export default router;
