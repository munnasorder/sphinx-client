import React, { useEffect, useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import './pricing.css';
import PricingList from './PricingList';
import axios from 'axios';

const Pricing = () => {
    const [pricing, setPricing] = useState([]);


    useEffect(() => {
        async function fetchData() {
            const plan = await axios.get('https://salty-eyrie-56006.herokuapp.com/allPricingPlans')
            setPricing(plan.data);
        }
        fetchData();
    }, [])
   
    return (
        <div className="pricing-container">
            <Container>
                <section>
                    <h3 className="pricing-title">SIMPLE PLANS. SIMPLE PRICING</h3>
                    <hr className="pricing-hr" />
                    <p className="pricing-desc">Cleanmate comes with cost calculator – a unique tool which allows you to easily createprice estimation forms to give your client idea of the cost of your service.</p>
                </section>
                <section className="mt-5">
                    <Row>
                        {
                            pricing.map((data, index) => <PricingList data={data} key={index} />)
                        }
                    </Row>
                </section>
            </Container>
        </div>
    );
};

export default Pricing;