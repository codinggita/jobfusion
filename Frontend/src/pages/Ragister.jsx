import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BriefcaseIcon, Eye, EyeOff, Loader } from 'lucide-react';
import axios from 'axios';

function Register() {
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [step, setStep] = useState('register'); // 'register' or 'verify'
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        workStatus: 'fresher',
        otp: ''
    });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            if (step === 'register') {
                const userData = {
                    username: formData.username,
                    email: formData.email,
                    password: formData.password,
                    experienceLevel: formData.workStatus === 'fresher' ? 'Fresher' : 'Experienced',
                };

                const response = await axios.post('http://localhost:5000/api/users/register', userData);
                console.log('Registration initiated:', response.data);
                setStep('verify');
            } else if (step === 'verify') {
                const verifyData = {
                    email: formData.email,
                    otp: formData.otp
                };

                const response = await axios.post('http://localhost:5000/api/users/verify-otp', verifyData);
                console.log('Email verified:', response.data);
                navigate('/login');
            }
        } catch (error) {
            setError(error.response?.data?.message || (step === 'register' ? 'Registration failed' : 'Verification failed'));
        } finally {
            setLoading(false);
        }
    };

    const handleResendOTP = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await axios.post('http://localhost:5000/api/users/resend-otp', {
                email: formData.email
            });
            console.log('OTP resent:', response.data);
            alert('A new verification code has been sent to your email');
        } catch (error) {
            setError(error.response?.data?.message || 'Failed to resend verification code');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="min-h-screen flex">
            <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8">
                <div className="w-full max-w-md">
                    <div className="flex items-center gap-2 mb-8">
                        <BriefcaseIcon className="h-8 w-8 text-blue-600" />
                        <span className="text-xl font-bold">JOB FUSION</span>
                    </div>

                    <h1 className="text-3xl font-bold mb-2">
                        {step === 'register' ? 'REGISTER' : 'VERIFY EMAIL'}
                    </h1>
                    {error && <p className="text-red-500 mb-4">{error}</p>}

                    {step === 'register' ? (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input 
                                type="text" 
                                name="username" 
                                placeholder="Username" 
                                value={formData.username} 
                                onChange={handleChange} 
                                className="w-full p-3 rounded-lg bg-blue-50 focus:ring-2 focus:ring-blue-600" 
                                required 
                            />
                            <input 
                                type="email" 
                                name="email" 
                                placeholder="Email" 
                                value={formData.email} 
                                onChange={handleChange} 
                                className="w-full p-3 rounded-lg bg-blue-50 focus:ring-2 focus:ring-blue-600" 
                                required 
                            />

                            <div className="relative">
                                <input 
                                    type={showPassword ? "text" : "password"} 
                                    name="password" 
                                    placeholder="Password" 
                                    value={formData.password} 
                                    onChange={handleChange} 
                                    className="w-full p-3 rounded-lg bg-blue-50 focus:ring-2 focus:ring-blue-600" 
                                    required 
                                />
                                <button 
                                    type="button" 
                                    onClick={() => setShowPassword(!showPassword)} 
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                                >
                                    {showPassword ? <EyeOff className="text-gray-500" /> : <Eye className="text-gray-500" />}
                                </button>
                            </div>

                            <div className="flex gap-4">
                                <label className="flex items-center gap-2">
                                    <input 
                                        type="radio" 
                                        name="workStatus" 
                                        value="fresher" 
                                        checked={formData.workStatus === 'fresher'} 
                                        onChange={handleChange} 
                                        className="hidden" 
                                    />
                                    <span className={`px-4 py-2 rounded-full cursor-pointer ${formData.workStatus === 'fresher' ? 'bg-blue-600 text-white' : 'bg-blue-50 text-gray-700'}`}>
                                        Fresher
                                    </span>
                                </label>
                                <label className="flex items-center gap-2">
                                    <input 
                                        type="radio" 
                                        name="workStatus" 
                                        value="experienced" 
                                        checked={formData.workStatus === 'experienced'} 
                                        onChange={handleChange} 
                                        className="hidden" 
                                    />
                                    <span className={`px-4 py-2 rounded-full cursor-pointer ${formData.workStatus === 'experienced' ? 'bg-blue-600 text-white' : 'bg-blue-50 text-gray-700'}`}>
                                        Experienced
                                    </span>
                                </label>
                            </div>

                            <button 
                                type="submit" 
                                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors flex justify-center items-center"
                            >
                                {loading ? <Loader className="animate-spin" /> : 'Register Now'}
                            </button>
                        </form>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <p className="text-gray-600 mb-4">
                                We've sent a verification code to your email address. Please enter the code below to verify your account.
                            </p>
                            <input 
                                type="text" 
                                name="otp" 
                                placeholder="Enter verification code" 
                                value={formData.otp} 
                                onChange={handleChange} 
                                className="w-full p-3 rounded-lg bg-blue-50 focus:ring-2 focus:ring-blue-600" 
                                required 
                            />
                            <button 
                                type="submit" 
                                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors flex justify-center items-center"
                            >
                                {loading ? <Loader className="animate-spin" /> : 'Verify Email'}
                            </button>
                            <button 
                                type="button" 
                                onClick={handleResendOTP} 
                                className="w-full bg-transparent text-blue-600 py-2 rounded-lg hover:bg-blue-50 transition-colors"
                            >
                                Resend Verification Code
                            </button>
                        </form>
                    )}

                    <div className="mt-8">
                        {step === 'register' && (
                            <button className="w-full flex items-center justify-center gap-2 p-3 border rounded-lg hover:bg-gray-50">
                                <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
                                <span>Continue with Google</span>
                            </button>
                        )}
                    </div>

                    <p className="text-center mt-6">
                        Already have an account? <Link to="/login" className="text-blue-600 hover:underline">Log in</Link>
                    </p>
                </div>
            </div>

            <div className="hidden lg:block lg:w-1/2 bg-blue-50 p-12">
                <div className="h-full rounded-3xl overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-b from-blue-500/20 to-blue-600/20" />
                    <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-12">
                        <h2 className="text-4xl font-bold text-white mb-4">Great opportunities await you. Register now!</h2>
                    </div>
                    <img src="https://images.unsplash.com/photo-1529539795054-3c162aab037a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bG9naW58ZW58MHx8MHx8fDA%3D" alt="Professional woman" className="w-full h-full object-cover" />
                </div>
            </div>
        </div>
    );
}

export default Register;