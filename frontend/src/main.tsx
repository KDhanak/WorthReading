import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom';
import { AuthProvider } from './contexts/authContext';
import router from './routes/routes';
import { BookProvider } from './contexts/bookContext';
import { CartProvider } from './contexts/cartContext';
import { HelmetProvider } from 'react-helmet-async';
import { WishlistProvider } from './contexts/wishlistContext';


createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<HelmetProvider>
			<AuthProvider>
				<BookProvider>
					<CartProvider>
						<WishlistProvider>
							<RouterProvider router={router} />
						</WishlistProvider>
					</CartProvider>
				</BookProvider>
			</AuthProvider>
		</HelmetProvider>
	</StrictMode>,
)
