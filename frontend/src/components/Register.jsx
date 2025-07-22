import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const Register = () => {

    const [input,setInput] = useState({
        username:"",
        email:"",
        password:"",
    });

    const handleInput=(e)=>{
        setInput({...input,[e.target.name]:e.target.value})
    }
    const handleSubmit=(e)=>{
        e.preventDefault();
        console.log(input);
    }
    return (
        <div className="sign-up-container">
        <h2>Register</h2>
        <form className="sign-up-form" onSubmit={handleSubmit}>
            <label htmlFor="username">Username:</label>
            <input
            type="text"
            name="username"
            value={input.username}
            placeholder="username"
            onChange={(e) => {
                handleInput(e);
            }}
            />

            <label htmlFor="email">Email:</label>
            <input
            type="email"
            name="email"
            value={input.email}
            placeholder="email"
            onChange={(e) => {
                handleInput(e);
            }}
            />

            <label htmlFor="password">Password:</label>
            <input
            type="password"
            name="password"
            value={input.password}
            placeholder="password"
            onChange={(e) => {
                handleInput(e);
            }}
        />

        <button type="submit">Sign up</button>
        <p>Already a user? <Link to='/login'>Login</Link></p>
        
        </form>
    </div>
    )
}

export default Register