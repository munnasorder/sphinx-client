import React from 'react';
import { Col, Card } from 'react-bootstrap';

const ServiceList = (props) => {
    const {name, img, description} = props.data;
    return (
       <Col xs={12} md={6} lg={4} xl={4}>
            <Card className="main-card">
                <Card.Img className="img-fluid card-image" variant="top" src={img} />
                <Card.Body>
                    <Card.Title className="card-title">
                        {name}
                    </Card.Title>
                    <hr className="card-hr" />
                    <Card.Text className="card-description">
                        {description}
                    </Card.Text>
                </Card.Body>
            </Card>
       </Col>
    );
};

export default ServiceList;