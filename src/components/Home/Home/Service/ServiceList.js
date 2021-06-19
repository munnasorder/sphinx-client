import React from 'react';
import { Col, Card } from 'react-bootstrap';
import {Fade, Zoom } from 'react-reveal';

const ServiceList = (props) => {
    const {name, img, description} = props.data;
    return (
       <Col xs={12} md={6} lg={4} xl={4}>
            <Card className="main-card">
                <Zoom>
                    <Card.Img className="img-fluid card-image" variant="top" src={img} />
                </Zoom>
                <Card.Body>
                    <Fade left>
                        <Card.Title className="card-title">
                        {name}
                        </Card.Title>
                        <hr className="card-hr" />
                    </Fade>                   
                    <Fade right>
                        <Card.Text className="card-description">
                            {description}
                        </Card.Text>
                    </Fade>
                </Card.Body>
            </Card>
       </Col>
    );
};

export default ServiceList;