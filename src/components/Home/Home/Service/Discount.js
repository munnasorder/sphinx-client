import React from 'react';
import { Container } from 'react-bootstrap';
import { Fade } from 'react-reveal';

const Discount = () => {
    return (
        <section className="discount-container">
            <Container>
                <div className="text-center">
                    <Fade left>
                        <h1 className="discount-title">15% OFF FOR OUR <br /> NEW CLIENT</h1>
                    </Fade>
                    <Fade right>
                        <button className="discount-btn">GET A SERVICE NOW</button>
                    </Fade>
                </div>
            </Container>
        </section>
    );
};

export default Discount;