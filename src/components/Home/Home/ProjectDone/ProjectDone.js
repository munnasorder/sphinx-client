import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import './projectDone.css';
import image1 from '../../../../images/service/images.jpg';
import image2 from '../../../../images/service/image_02-6.jpg';
import image3 from '../../../../images/service//about1 - Copy.jpg';
import image4 from '../../../../images/service/image_02-2-480x320.jpg';
import image5 from '../../../../images/service//image_08.jpg';
import image6 from '../../../../images/service/about3.jpg';
import {Fade, Zoom } from 'react-reveal';


const ProjectDone = () => {

    return (
        <Container style={{paddingBottom: '80px'}}>
            <section style={{paddingBottom: '50px'}}>
                <Zoom>
                    <h3 className="pricing-title">SELECTED PROJECTS</h3>
                    <hr className="pricing-hr" />
                    <p className="pricing-desc">Explore completed projects.</p>
                </Zoom>
            </section>
            <section>
                <Row>
                    <Col xs={6} md={6} lg={6} xl={6}>
                        <Fade left>
                            <Row>
                                <Col xs={12} md={6} lg={6} xl={6}>
                                    <img className="img-fluid" style={{marginBottom: '28px'}} src={image1} alt="" />
                                    <img className="img-fluid" src={image2} alt="" />
                                </Col>
                                <Col xs={12} md={6} lg={6} xl={6}>
                                    <img className="img-fluid" src={image3} alt="" />
                                </Col>
                            </Row>
                        </Fade>
                    </Col>
                    <Col xs={6} md={6} lg={6} xl={6}>
                        <Fade right>
                            <Row>
                                <Col xs={12} md={6} lg={6} xl={6}>
                                    <img className="img-fluid" src={image6} alt="" />
                                </Col>
                                <Col xs={12} md={6} lg={6} xl={6}>
                                    <img className="img-fluid" style={{marginBottom: '28px'}} src={image4} alt="" />
                                    <img className="img-fluid" src={image5} alt="" />
                                </Col>
                            </Row>
                        </Fade>
                    </Col>
                </Row>
            </section>
        </Container>
    );
};

export default ProjectDone;