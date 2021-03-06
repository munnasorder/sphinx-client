import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import './about.css'
import image1 from '../../../../images/service/about1.jpg'
import image2 from '../../../../images/service/about2.jpg'
import image3 from '../../../../images/service/about3.jpg'
import {Fade, Flip, Zoom, Bounce } from 'react-reveal';


const About = () => {
    return (
        <Container style={{marginBottom: '50px'}}>
            <Row style={{margin: '0'}}>
                <Col xs={12} md={12} lg={6} xl={6} className="mb-3">
                    <Row>
                        <Col xs={6} md={6} lg={6} xl={6}>
                            <Zoom>
                                <img className="img-fluid" style={{marginBottom: '28px'}} src={image1} alt="" />
                            </Zoom>
                            <Zoom>
                                <img className="img-fluid" src={image2} alt="" />
                            </Zoom>
                        </Col>
                        <Col xs={6} md={6} lg={6} xl={6}>
                            <Zoom>
                                <img className="img-fluid" src={image3} alt="" />
                            </Zoom>
                        </Col>
                    </Row>
                </Col>
                <Col xs={12} md={12} lg={6} xl={6}>
                    <div>
                        <Bounce>
                            <h2 className="about-title">ABOUT OUR COMPANY</h2>
                            <hr className="about-hr" />
                        </Bounce>
                        <Flip left>
                            <p className="about-banner">Exceptional level of cleaning services.</p>
                        </Flip>                       
                        <Fade left>
                            <p className="about-description">Founded in 1995 Cleanmate quickly built a reputation as one of the leading providers of residential and commercial cleaning solutions. Our continuous pursuit for perfection has resulted in consistent growth each year. Our focus is to listen to our clients, understand their needs and provide the exceptional level of residential and commercial cleaning service.</p>
                        </Fade>
                    </div>
                    <div className="text-center mt-4">
                        <button className="btn-more">Learn More</button>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default About;