import React, { useContext, useEffect, useState } from 'react';
import { Col, Row, Card } from 'react-bootstrap';
import SideNav from './SideNav';
import axios from 'axios';

import { UserContext } from '../../App';

const PricingAndPlan = () => {
  const [loading, setLoading] = useState(true);
  const [plan, setPlan] = useState({});
  const [loggedInUser] = useContext(UserContext)

// initial product load
  useEffect(() => {
    async function fetchData(){
      const data = await axios.get(`https://salty-eyrie-56006.herokuapp.com/getPlan/${loggedInUser.email}`)
      setPlan(data.data)
      setLoading(false)
    }
    fetchData();
  }, [])


  if (loading) {
    return <div>Loading....</div>
  }
    return (
        <div className="">
        <Row style={{margin: '0', padding: '0 50px 0 0'}}>
          <Col className="m-0 p-0" md={3}>
           <SideNav />
          </Col>
          <Col md={9} className="edit-container">
          <h3 style={{fontWeight: 'bold'}}>My Plan</h3>
              <Row className="add-product-container">
                <Col md={6}>
                {
                  plan ? (
                    <Card>
                        <Card.Body>
                        <Card.Title>{plan?.pricingPlan.title}</Card.Title>
                        <Card.Text>
                            <b>Information.</b>
                        </Card.Text>
                        <Card.Text>
                            Address: {plan?.address}
                        </Card.Text>
                        <Card.Text>
                            City: {plan?.city}
                        </Card.Text>
                        <Card.Text>
                            Zip: {plan?.zip}
                        </Card.Text>
                        <Card.Text>
                            Phone: {plan?.paymentInfo.phone}
                        </Card.Text>
                        </Card.Body>
                        <Card.Footer>
                        <small className="text-muted">You have joined the plan {plan?.date}</small>
                        </Card.Footer>
                    </Card>
                  ) : (
                    <div>
                      <h1>Sorry You have no plans or network error!</h1>
                    </div>
                  )
                }
                </Col>
              </Row>
        </Col>
        </Row>
      </div>
    );
};

export default PricingAndPlan;