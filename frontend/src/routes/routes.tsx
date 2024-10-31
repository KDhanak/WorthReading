import { createBrowserRouter, Navigate } from 'react-router-dom';
import App from '../App';
import Login from '../components/login/login';
import Register from '../components/register/register';
import Home from '../components/home/home';

const router = createBrowserRouter([
    {
        path:'login',
        element: <Login />
    },
    {
        path:'register',
        element: <Register />
    },
    {
        path:'/',
        element:<App />,
        children: [
            {
                path:'',
                element:<Home />
            },
        ]
    }
])

export default router;
