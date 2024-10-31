import Helmet from 'react-helmet';
import React, { useState } from 'react';
import { useAuth } from '../../contexts/authContext';
import Loading from '../loading/loading';
import { useNavigate  } from 'react-router-dom';

const Register: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {register, error} = useAuth();
    const [loading, setLoading] = useState<boolean>();
    const navigate = useNavigate ();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        try{ 
            await register(name, email, password);
            navigate('/');
        } catch (err) {
            console.error('Register failed', err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <Loading />

    return (
        <>
        <Helmet>
                <title>Register</title>
                <meta name="description" content="Register to create an account on MyApp." />
            </Helmet>
            <section className="bg-green_1 text-green_4">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                        <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
                        WorthReading    
                    </a>
                    <div className="w-full bg-green_2 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Create an account
                            </h1>
                            {error && <p className="text-red-500">{error}</p>}
                            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                            <div>
                                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your name</label>
                                    <input type="name" name="name" id="name" className="border placeholder-gray-400 text-green_1 border-gray-300 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Kishan" value={name}
                                        onChange={(e) => setName(e.target.value)} required />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                    <input type="email" name="email" id="email" className="border placeholder-gray-400 text-green_1 border-gray-300 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="name@company.com" value={email}
                                        onChange={(e) => setEmail(e.target.value)} required />
                                </div>
                                <div>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                    <input type="password" name="password" id="password" placeholder="••••••••" className="border placeholder-gray-400 text-green_1 border-gray-300 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" value={password}
                                        onChange={(e) => setPassword(e.target.value)} required />
                                </div>
                                <button type="submit" className="w-full text-green_2 bg-green_4 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-green_3 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Create an account</button>
                                <p className="text-sm font-light text-green_4">
                                    Already have an account? <a href="/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</a>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Register;
