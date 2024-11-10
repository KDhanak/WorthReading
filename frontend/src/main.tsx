import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom';
import { AuthProvider } from './contexts/authContext';
import router from './routes/routes';
import { BookProvider } from './contexts/bookContext';


createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<AuthProvider>
			<BookProvider>
				<RouterProvider router={router} />
			</BookProvider>
		</AuthProvider>
	</StrictMode>,
)
