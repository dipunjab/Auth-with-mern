import React, { useState } from 'react'
import Input from "../components/Input.jsx"
import { Loader, Lock, Mail, User } from "lucide-react"
import { Link, useNavigate } from "react-router-dom";
import PasswordStrength from '../components/PasswordStrength.jsx';
import { useAuthStore } from '../store/authStore.js';

const Signup = () => {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();

    const {signup, error, isLoading} = useAuthStore();

    const handleSignup = async(e) => {
        e.preventDefault();

        try {
            await signup(email, password, name);
            navigate("/verify-email")
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='max-w-md w-full bg-teal-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl 
    overflow-hidden'>
            <div className='p-8'>
                <h2 className='text-3xl font-bold mb-6 text-center bg-gradient-to-r from-blue-300 to-cyan-400 text-transparent bg-clip-text'>
                    Create Account
                </h2>

                <form onSubmit={handleSignup}>
                    <Input
                        icon={User}
                        type="text"
                        placeholder="Fullname"
                        value={name}
                        onChange={(e) => setName(e.target.value)} />
                    <Input
                        icon={Mail}
                        type="text"
                        placeholder="Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} />
                    <Input
                        icon={Lock}
                        type="text"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} />
                   
                   {error && <p className='text-red-500 font-semibold mt-2'>{error}</p>}

                    {/* Password Strength meter */}
                    <PasswordStrength password={password} />

                    <button
                        className='mt-5 w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-cyan-600 text-white 
						font-bold rounded-lg shadow-lg hover:from-blue-600
						hover:to-cyan-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
						 focus:ring-offset-gray-900 transition duration-200'
                        type='submit'
                        disabled={isLoading}
                    >
                        {isLoading ? <Loader className='animate-spin mx-auto' size={24}/>: "Sign Up"}
                    </button>
                </form>
            </div>
            <div className='px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center'>
                <p className='text-sm text-gray-400'>
                    Already have an account?{" "}
                    <Link to={"/login"} className='text-blue-400 hover:underline'>
                        Login
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default Signup
