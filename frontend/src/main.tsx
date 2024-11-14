import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom';
import { AuthProvider } from './contexts/authContext';
import router from './routes/routes';
import { BookProvider } from './contexts/bookContext';
import { CartProvider } from './contexts/cartContext';


createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<AuthProvider>
			<BookProvider>
				<CartProvider>
					<RouterProvider router={router} />
				</CartProvider>
			</BookProvider>
		</AuthProvider>
	</StrictMode>,
)
