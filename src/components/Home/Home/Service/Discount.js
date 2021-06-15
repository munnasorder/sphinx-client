import React from 'react';
import { Container } from 'react-bootstrap';

const Discount = () => {
    return (
        <section className="discount-container">
            <Container>
                <div className="text-center">
                    <h1 className="discount-title">15% OFF FOR OUR <br /> NEW CLIENT</h1>
                    <button className="discount-btn">GET A SERVICE NOW</button>
                </div>
            </Container>
        </section>
    );
};

export default Discount;