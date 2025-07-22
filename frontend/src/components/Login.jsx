import React, { useState } from 'react'
import {Link} from 'react-router-dom'

const Login = () => {
    const [input, setInput] = useState({
        email:"",
        password:"",
    });

    const handleInput=(e)=>{
        setInput({...input,[e.target.name]:e.target.value});
    }
    const handleSubmit=async(e)=>{
        e.preventDefault();
        console.log(input);
    }
    return (
        <div>
            <h2>Sign in</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor='email'>
                    Email:
                </label>
                <input
                type='email'
                name='email'
                value={input.email}
                placeholder="email"
                onChange={(e)=>{
                    handleInput(e);
                }}/>

                <label htmlFor='password'>
                    Password:
                </label>
                <input
                type='password'
                name='password'
                value={input.password}
                placeholder="Password"
                onChange={(e)=>{
                    handleInput(e);
                }}/>
                <button type='submit'>Log in</button>
                <p>Don't have an account?<Link to='/register'>Sign up</Link></p>  
            </form>
        </div>
    )
}

export default Login