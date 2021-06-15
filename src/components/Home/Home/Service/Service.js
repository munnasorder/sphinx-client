import React, { useEffect, useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import './service.css'
import ServiceList from './ServiceList';
import axios from 'axios';

const Service = () => {

    const [service, setService] = useState([]);

    useEffect( () => {
        async function fetchData () {
            const serviceData = await axios.get('https://salty-eyrie-56006.herokuapp.com/allService');
            setService(serviceData.data);
        }
        fetchData();
    }, [])

    return (
        <div className="service-container">
            <Container>
                <div>
                    <h3 className="service-title">OUR CLEANING SERVICES</h3>
                    <hr className="service-hr" />
                    <p className="service-desc">Do you wish you had more free time? We can make it happen!</p>
                </div>
                <Row style={{marginTop: '50px'}}>
                    {
                        service?.map((data, index) => <ServiceList data={data} key={index} />)
                    }
                </Row>
            </Container>
        </div>
    );
};

export default Service;