import React, { useContext, useState } from 'react';
import './authStyle.css'
import { faFacebookF, faGoogle } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useFormik } from 'formik'
import { getJwtToken, loginInitialMethod, loginWithEmailAndPassword, loginWithFacebookPopup, loginWithGooglePopup } from './loginManagement/loginManagement';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { UserContext } from '../../App';
import { Spinner } from 'react-bootstrap';


const Login = () => {
    let location = useLocation();
    const history = useHistory();
    let { from } = location.state || { from: { pathname: "/" } };

    const [loggedInUser, setLoggedInUser] = useContext(UserContext)

    // loading spinier set and error massage handle
    const [loading, setLoading] = useState(false);
    const [fail, setFail] = useState('');

    // firebase initial
    loginInitialMethod();

    const initialValues = {
        email: '',
        password: ''
    }
    const validate = (values) => {
        let errors = {};

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
        loginWithEmailAndPassword(values.email, values.password)
        .then(res => {
            const checkResult = typeof(res);
            if (checkResult === 'object') {
                setLoading(false);
                setLoggedInUser(res)
                getJwtToken()
                history.replace(from)
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

    const handleFbLogin = () => {
        loginWithFacebookPopup()
        .then(res => {
            const checkResult = typeof(res);
            if (checkResult === 'object') {
                setLoggedInUser(res)
                getJwtToken()
                history.replace(from)
            } else {
                setFail(res)
            }
        })
    }

    const handleGoogleLogin = () => {
        loginWithGooglePopup()
        .then(res => {
            const checkResult = typeof(res);
            if (checkResult === 'object') {
                setLoggedInUser(res)
                getJwtToken()
                history.replace(from)
            } else {
                setFail(res)
            }
        })
    }
    const backOnePage = () => {
        history.push('/')
    }
    return (
        <section className="login-container">
            <main className="content-area">
            <FontAwesomeIcon className="leftArrow" onClick={backOnePage} icon={faArrowLeft} />
                <div className="login-title pb-4">
                    <h4>Login</h4>
                    <hr />
                    {
                        loading ? <div className="text-center pt-2"><Spinner animation="border" /></div> : null
                    }
                    {
                        fail.length > 0 ? <span style={{color: 'red'}}>{fail}</span> : null
                    }
                </div>
                <form onSubmit={formik.handleSubmit}>
                    <label htmlFor="email">Email:</label>
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
                        value="Login"
                        className="login-btn"
                    />
                    <div className="signup-link">
                    <Link to="/signup" >Don't have an account? Sign Up</Link>
                    </div>
                </form>
                <div className="d-flex justify-content-center pt-4 pb-4">
                    <button onClick={handleFbLogin} className="social-fb mr-3"><FontAwesomeIcon icon={faFacebookF} /></button>
                    <button onClick={handleGoogleLogin} className="social-google mr-3"><FontAwesomeIcon icon={faGoogle} /></button>
                </div>
                <div style={{color: 'black', textAlign: 'center'}}>
                <small>&copy; Copyright <a href="https://munnasorder.netlify.app/">Munna Islam</a> {new Date().getFullYear()}.</small>
                </div>
            </main>
        </section>
    );
};

export default Login;