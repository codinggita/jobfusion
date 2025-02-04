import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BriefcaseIcon, Eye, EyeOff } from 'lucide-react';

function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const userData = {
            email: formData.email,
            password: formData.password
        };

        try {
            const response = await fetch('https://jobfusion.onrender.com/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('userEmail', formData.email); 
                navigate('/');
            } else {
                setError(data.message || 'Login failed. Please try again.');
            }
        } catch (error) {
            console.error('Error logging in:', error);
            setError('An error occurred. Please try again later.');
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className="min-h-screen flex">
            {/* Left side - Login form */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8">
                <div className="w-full max-w-md">
                    <Link to="/" className="flex items-center gap-2 mb-8">
                        <BriefcaseIcon className="h-8 w-8 text-blue-600" />
                        <span className="text-xl font-bold">JOB FUSION</span>
                    </Link>

                    <h1 className="text-3xl font-bold mb-2">LOGIN</h1>
                    <p className="text-gray-600 mb-8">How to get started lorem ipsum dolor at?</p>

                    {/* Error Message */}
                    {error && <div className="mb-4 text-red-600">{error}</div>}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full p-3 rounded-lg bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-600"
                            />
                        </div>

                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full p-3 rounded-lg bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-600"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2"
                            >
                                {showPassword ? <EyeOff className="text-gray-500" /> : <Eye className="text-gray-500" />}
                            </button>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Login Now
                        </button>
                    </form>

                    <div className="mt-8">
                        <p className="text-center text-gray-600 mb-4">Login with Others</p>
                        <div className="space-y-3">
                            <button className="w-full flex items-center justify-center gap-2 p-3 border rounded-lg hover:bg-gray-50">
                                <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
                                <span>Login with Google</span>
                            </button>
                            <button className="w-full flex items-center justify-center gap-2 p-3 border rounded-lg hover:bg-gray-50">
                                <img src="https://www.facebook.com/favicon.ico" alt="Facebook" className="w-5 h-5" />
                                <span>Login with Facebook</span>
                            </button>
                            <p className="text-center mt-6">
                                For A New User {' '}
                                <Link to="/register" className="text-blue-600 hover:underline">
                                    Sign Up
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right side - Image */}
            <div className="hidden lg:block lg:w-1/2 bg-blue-50 p-12">
                <div className="h-full rounded-3xl overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-b from-blue-500/20 to-blue-600/20" />
                    <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-12">
                        <h2 className="text-4xl font-bold text-white mb-4">
                            Very good works are waiting for you. Login Now!!!
                        </h2>
                    </div>
                    <img
                        src="https://images.unsplash.com/photo-1529539795054-3c162aab037a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bG9naW58ZW58MHx8MHx8fDA%3D"
                        alt="Professional woman"
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>
        </div>
    );
}

export default Login;
