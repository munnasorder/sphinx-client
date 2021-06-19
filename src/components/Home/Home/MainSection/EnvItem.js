import React from 'react';
import { Col } from 'react-bootstrap';
import { Bounce } from 'react-reveal';

const EnvItem = (props) => {
    const {title, icon,} = props.data;
    const changeData = props.changeData;
    return (
        <Col md={4} className="text-center" style={{cursor: 'pointer'}} onClick={() => changeData(props.id)}>
            <Bounce>
                <img width="60" src={icon} alt="" />
                <h4 style={{color: 'white', marginTop: '20px'}}>{title}</h4>
            </Bounce>  
        </Col>
    );
};

export default EnvItem;