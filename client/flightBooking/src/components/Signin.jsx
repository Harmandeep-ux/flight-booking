import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Signin() {
    const navigate = useNavigate();
    const [user, setUser] = useState({ name: '', email: '', password: '' });
    const [isAdmin, setIsAdmin] = useState(false);
    const [isSignIn, setIsSignIn] = useState(true);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { name, email, password } = user;

        if ((isSignIn && (!email || !password)) || (!isSignIn && (!name || !email || !password))) {
            alert('Please fill all fields!');
            return;
        }

        console.log(user);

        navigate(isAdmin ? '/adminhome' : '/userhome');
    };

    const toggleUserAdmin = () => setIsAdmin(prev => !prev);
    const toggleMode = () => setIsSignIn(prev => !prev);

    const backgrounds = {
        user: 'https://images.unsplash.com/photo-1488085061387-422e29b40080?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cGxhbmV8ZW58MHx8MHx8fDA%3D',
        admin: 'https://assets.grok.com/users/e8c53ca9-fa84-4b63-8d66-073830960895/generated/4bIQbLxATwr053iY/image.jpg'
    };

    return (
        <div 
            className="w-full h-screen flex items-center justify-center bg-cover bg-center" 
            style={{ backgroundImage: `url(${isAdmin ? backgrounds.admin : backgrounds.user})` }}
        >
            <div className="p-8 rounded-2xl shadow-2xl bg-white bg-opacity-80 w-96 flex flex-col items-center">
                <h1 className={`text-3xl font-bold mb-6 ${isAdmin ? 'text-purple-700' : 'text-blue-700'}`}>
                    {isAdmin ? 'Admin' : 'User'} {isSignIn ? 'Sign In' : 'Create Account'}
                </h1>

                <form onSubmit={handleSubmit} className="w-full flex flex-col items-center">
                    {/* Show Name field only when creating account */}
                    {!isSignIn && (
                        <InputField 
                            label="Name" 
                            name="name" 
                            value={user.name} 
                            onChange={handleChange} 
                            placeholder="Enter your name"
                        />
                    )}

                    <InputField 
                        label="Email" 
                        name="email" 
                        value={user.email} 
                        onChange={handleChange} 
                        placeholder="Enter your email"
                        type="email"
                    />

                    <InputField 
                        label="Password" 
                        name="password" 
                        value={user.password} 
                        onChange={handleChange} 
                        placeholder="Enter your password"
                        type="password"
                    />

                    <button 
                        type="submit"
                        className={`w-full h-12 ${isAdmin ? 'bg-purple-600' : 'bg-blue-500'} rounded-md text-white font-semibold hover:opacity-90 transition`}
                    >
                        {isSignIn ? 'Sign In' : 'Create Account'}
                    </button>
                </form>

                <div className="text-black my-4">OR</div>

                <button 
                    onClick={toggleUserAdmin} 
                    className="w-full h-12 bg-green-500 rounded-md text-white font-semibold hover:bg-green-400 transition"
                >
                    {isAdmin ? 'Switch to User' : 'Switch to Admin'}
                </button>

                <p className="text-black mt-6">
                    {isSignIn ? "Don't have an account?" : "Already have an account?"}
                    <button onClick={toggleMode} className="text-blue-600 ml-2 underline">
                        {isSignIn ? 'Create Account' : 'Sign In'}
                    </button>
                </p>
            </div>
        </div>
    );
}

// InputField component to avoid repeating code
function InputField({ label, name, value, onChange, placeholder, type = "text" }) {
    return (
        <>
            <label htmlFor={name} className="text-black self-start ml-2">{label}</label>
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="w-full h-12 mb-4 mt-1 px-4 rounded-md bg-zinc-100 text-black"
            />
        </>
    );
}
