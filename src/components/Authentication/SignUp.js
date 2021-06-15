import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './authStyle.css'
import { useFormik } from 'formik'
import { signUpWithEmailAndPassword } from './loginManagement/loginManagement';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Spinner } from 'react-bootstrap';

const SignUp = () => {
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [fail, setFail] = useState('');

    const initialValues = {
        name: '',
        email: '',
        password: ''
    }
    const validate = (values) => {
        let errors = {};

        if (!values.name) {
            errors.name = 'Require'
        } else if (values.name.length < 3) {
            errors.name = 'Name is too short'
        }

        if (!values.email) {
            errors.email = 'Require'
        } else if(!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(values.email)){
            errors.email = 'Invalid email address'
        }

        if (!values.password) {
            errors.password = 'Require'
        } else if (values.password.length < 8) {
            errors.password = 'Password must be at least 8 characters'
        }

        return errors;
    }
    const onSubmit = (values) => {
        setLoading(true);
        setFail('');
        signUpWithEmailAndPassword(values.name, values.email, values.password)
        .then(res => {
            if (res === true) {
                setLoading(false);
                alert('account create successful')
                history.push('/login')
            } else {
                setLoading(false);
                setFail(res)
            }
        })
    }
    const formik = useFormik({
        initialValues,
        validate,
        onSubmit
    })

    const backOnePage = () => {
        history.push('/')
    }

    return (
        <section className="login-container">
            <main className="content-area">
            <FontAwesomeIcon className="leftArrow" onClick={backOnePage} icon={faArrowLeft} />
                <div className="login-title pb-4">
                    <h4>Sign Up</h4>
                    {
                        loading ? <div className="text-center pt-2"><Spinner animation="border" /></div> : null
                    }
                    {
                        fail.length > 0 ? <span style={{color: 'red'}}>{fail}</span> : null
                    }
                </div>
                <form onSubmit={formik.handleSubmit}>
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        placeholder="Full Name"
                        name="name"
                        id="name"
                        className="form-control"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.name}
                    />
                    {
                        formik.touched.name && formik.errors.name ? (
                            <span style={{color: 'red'}}>{formik.errors.name}</span>
                        ) : ( null )
                    }
                    <label className="mt-3 d-block" htmlFor="email">Email:</label>
                    <input
                        type="email"
                        placeholder="Email Address"
                        name="email"
                        id="email"
                        className="form-control"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                    />
                    {
                        formik.touched.email && formik.errors.email ? (
                            <span style={{color: 'red'}}>{formik.errors.email}</span>
                        ) : ( null )
                    }
                    <label className="mt-3 d-block" htmlFor="password">Password:</label>
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        id="password"
                        className="form-control"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                    />
                    {
                        formik.touched.password && formik.errors.password ? (
                            <span style={{color: 'red'}}>{formik.errors.password}</span>
                        ) : ( null )
                    }
                    <input
                        type="submit"
                        value="Sign Up"
                        className="login-btn"
                    />
                    <div className="signup-link">
                    <Link to="/login" >Already have an account? Sign in</Link>
                    </div>
                </form>
                <div style={{color: 'black', textAlign: 'center', paddingTop: '20px'}}>
                    <small>&copy; Copyright <a href="https://munnasorder.netlify.app/">Munna Islam</a> {new Date().getFullYear()}.</small>
                </div>
            </main>
        </section>
    );
};

export default SignUp;