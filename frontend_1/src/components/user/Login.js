import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Loader from '../Layout/Loader'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { login, clearErrors } from '../../actions/userActions'


const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const alert = useAlert();
    const dispatch = useDispatch();
    const { isAutenticated, loading, error } = useSelector((state) => state.auth)

    useEffect(() => {
        if (isAutenticated) {
            window.location.href = '/'
        }
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
    }, [dispatch, alert, isAutenticated, error])

    //fun to handle to submit
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(login(email, password))
    }

    return (
        <>
            {loading ? (<Loader />) : (<>
                <div className='row wrapper'>
                    <div className='col-10 col-lg-5'>
                        <form className='shadow-lg' onSubmit={submitHandler}>
                            <h1 className='mb-3'>Login</h1>
                            <div className='form-group'>
                                <label htmlFor='email_field'>Email</label>
                                <input type='email' id='email_field' className='form-control' value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>

                            <div className='form-group'>
                                <label htmlFor='password_field'>Password</label>
                                <input type='password' id='password_field' className='form-control' value={password} onChange={(e) => setPassword(e.target.value)} />
                            </div>
                            <Link to="/users/forgetPassword" className='float-right mb-4'>Forgot Password</Link>
                            <button id='login_button' type='submit' className='btn btn-block py3'>LOGIN</button>
                            <Link to="/users/signup" className='float-right mt-3'>NEW USER?</Link>
                        </form>
                    </div>
                </div>
            </>)}
        </>
    )
}

export default Login
