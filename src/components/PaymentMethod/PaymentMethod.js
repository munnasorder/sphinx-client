import React, { useContext, useEffect, useState } from 'react';
import { Card, CardDeck, Col, Row } from 'react-bootstrap';
import { useParams } from 'react-router';
import axios from 'axios';
import { useFormik } from 'formik';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import CheckoutForm from './payForm';
import { UserContext } from '../../App';
import { useHistory } from 'react-router-dom';

const stripePromise = loadStripe('pk_test_51ItZGYGo1cVqUfeBEyirICHAPnCnLHSWqhTOmt3HgcHs6cmEFUdKmiaRAKyhygt2KnH98rfwzFNdHZCDjcguKVA900jGdtdvz2');

const PaymentMethod = () => {
    const [isPayment, setIsPayment] = useState(false);
    const [paymentInfo, setPaymentInfo] = useState({});
    const [loggedInUser] = useContext(UserContext);
    let { id } = useParams();
    const history = useHistory();
    const [pricingPlan, setPricingPlan] = useState({});
    const {title, price, serviceList} = pricingPlan;

    // formik initial values
    const initialValues = {
        address: '',
        city: '',
        zip: '',
    }
    const validate = (values) => {
        let errors = {};

        if(!isPayment) {
            errors.isPayment = 'Please Payment First'
        }

        if(!values.address){
            errors.address = 'Required'
        }

        if(!values.city) {
            errors.city = 'Required'
        }

        if(!values.zip) {
            errors.zip = 'Required'
        }

        return errors;
    }

    const makePayment = (id, name, email, phone) => {
        const payInfo = {id, name, email, phone};
        setPaymentInfo(payInfo);
        setIsPayment(true)
    }
    const onSubmit = (values) => {
        const d = new Date();
        const parchesPlanInfo = {
            date: d.toLocaleDateString(),
            email: loggedInUser.email,
            address: values.address,
            city: values.city,
            zip: values.zip,
            pricingPlan,
            paymentInfo
        }
        fetch('https://salty-eyrie-56006.herokuapp.com/addPricingPlan', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(parchesPlanInfo)
        })
        .then(res => res.json())
        .then(data => {
            if (data) {
                alert('Successfully parsed');
                history.push('/plan');
            }
        })
        .catch(err => alert(err))
    }



    const formik = useFormik({
        initialValues,
        validate,
        onSubmit
    })
    const borderRed = {
        border: '1px solid red',
    }

    useEffect(() => {
        async function fetchData() {
            const plan = await axios.get(`https://salty-eyrie-56006.herokuapp.com/singlePricingPlan/${id}`);
            setPricingPlan(plan.data)
        }
        fetchData()
    }, [])
    return (
        <div className=""container>
            <Row style={{margin: '0'}}>
                <Col md={4}>
                    <h4 style={{padding: '30px 0 5px 0'}} className="pricing-title">SIMPLE PLANS. SIMPLE PRICING</h4>
                <CardDeck>
                <Card className="pricing-card">
                    <Card.Body>
                    <Card.Title className="plan">{title}</Card.Title>
                    <Card.Text className="price">${price}</Card.Text>
                    <Card.Text className="desc">/ per month</Card.Text>
                    <Card.Text>
                        <ul className="service-item">
                            {
                                serviceList?.map((item, index) => <li key={index}>{item}</li>)
                            }
                        </ul>
                    </Card.Text>
                    </Card.Body>
                </Card>
            </CardDeck>
                </Col>
                <Col md={4}>
                    <div>
                    <h4 style={{padding: '30px 0 5px 0'}} className="pricing-title">Address</h4>
                    <p style={{ color: '#7b7b7b'}}>Provide the correct address of your home below</p>
                    <form className="form-container" onSubmit={formik.handleSubmit}>
                        <label htmlFor="address">Address</label>
                        <input
                            type="text"
                            name="address"
                            placeholder="Address"
                            className="form-control mb-3"
                            id="address"
                            value={formik.values.address}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            style={formik.touched.address && formik.errors.address ? borderRed : null}
                        />
                        <label htmlFor="city">City</label>
                        <input
                            type="text"
                            name="city"
                            placeholder="City"
                            className="form-control mb-3"
                            id="city"
                            value={formik.values.city}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            style={formik.touched.city && formik.errors.city ? borderRed : null}
                        />
                        <label htmlFor="zip">Zip</label>
                        <input
                            type="text"
                            name="zip"
                            placeholder="Zip"
                            className="form-control mb-3"
                            id="zip"
                            value={formik.values.zip}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            style={formik.touched.zip && formik.errors.zip ? borderRed : null}
                        />
                        <input className="mt-4 btn btn-warning w-100" type="submit" value="Order" /> 
                        {
                           !isPayment ? <div className="mt-2"style={{color: 'red'}}>{formik.errors.isPayment}</div> : null
                        }                
                    </form>
                    </div>
                </Col>
                <Col md={4}>
                    <div>
                    <h4 style={{padding: '30px 0 5px 0'}} className="pricing-title">Payment Details</h4>
                    <p style={{textAlign: 'center', color: '#7b7b7b'}}>Complete Your Parches by providing your payment details</p>
                        <Elements stripe={stripePromise}>
                            <CheckoutForm price={price} makePayment={makePayment} />
                        </Elements>
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default PaymentMethod;