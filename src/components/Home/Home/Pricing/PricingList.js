import React from 'react';
import { Card, CardDeck, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const PricingList = (props) => {
    const {_id, title, price, serviceList} = props.data;
    return (
        <Col xs={12} md={6} lg={4} xl={4}>
            <CardDeck>
                <Card className="pricing-card mb-3">
                    <Card.Body>
                    <Card.Title className="plan">{title}</Card.Title>
                    <Card.Text className="price">${price}</Card.Text>
                    <Card.Text className="desc">/ per month</Card.Text>
                    <Card.Text>
                        <ul className="service-item">
                            {
                                serviceList.map((item, index) => <li key={index}>{item}</li>)
                            }
                        </ul>
                    </Card.Text>
                    </Card.Body>
                    <Card.Footer style={{border: 'none', backgroundColor: 'white', textAlign: 'center'}}>
                        <Link to={`/payment/${_id}`}><button className="plan-btn">SELECT A PLAN</button></Link>
                    </Card.Footer>
                </Card>
            </CardDeck>
        </Col>
    );
};

export default PricingList;