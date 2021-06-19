import React, { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import './mainSection.css'
import babyImg from '../../../../images/baby.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGem, faUmbrella, faHome, faFemale } from '@fortawesome/free-solid-svg-icons';
import envIcon from '../../../../images/icon/growth.svg';
import communication from '../../../../images/icon/chat.svg'
import customers from '../../../../images/icon/customer.svg'
import EnvItem from './EnvItem';
import {Fade, Zoom} from 'react-reveal';


const MainSection = () => {

    const [description, setDescription] = useState('Our cleaning services are affordable and our cleaning experts are highly trained. If for any reason you aren’t happy with our professional cleaning services, contact Cleanmate. We will come back and clean the specific areas that didn’t meet your expectations. Nothing is more important to us than your satisfaction.')

    const envInfo = [
        {
            icon: customers,
            title: 'OUR CUSTOMERS'
        },
        {
            icon: envIcon,
            title: 'THE ENVIRONMENT'
        },
        {
            icon: communication,
            title: 'COMMUNICATION'
        }
    ]
    const changeData = (i) => {
        if (i === 0) {
            setDescription('Our cleaning services are affordable and our cleaning experts are highly trained. If for any reason you aren’t happy with our professional cleaning services, contact Cleanmate. We will come back and clean the specific areas that didn’t meet your expectations. Nothing is more important to us than your satisfaction.')
        }
        if (i === 1) {
            setDescription('Our continuous pursuit for perfection has resulted in consistent growth each year. Our focus is to listen to our clients, understand their needs and provide the exceptional level of residential and commercial cleaning services. Choose us because of our reputation for excellence.')
        }
        if (i === 2) {
            setDescription('If for any reason you aren’t happy with our cleaning services please contact us. We will come back and clean the specific areas that didn’t meet. In case you need a special cleaning service we are happy to fulfill every request in order to exceed your expectations.')
        }
    }


    return (
        <div style={{marginTop: '80px'}}>
            <Container>
                <div className="text-center">
                    <h2>WHY CHOOSE US</h2>
                    <hr className="custom-hr" />
                    <p className="main-para">Cleanmate operates in Ottawa and provides a variety of cleaning services. <br /> Choose us because of our reputation for excellence.</p>
                </div>
                <Row style={{margin: '0'}}>
                    <Col md={3}>
                        <Fade left>
                            <div className="text-right">
                                <FontAwesomeIcon style={{color: '#36B4B6', fontSize: '45px'}} icon={faGem} />
                                <h5 className="mt-3">SPARKLING CLEAN</h5>
                                <p className="service-disc">We keep your home sparkling clean and germ free. Our disinfecting process kills 99% of common bacteria and viruses.</p>
                            </div>
                        </Fade>
                        
                        <Fade left>
                            <div className="text-right">
                                <FontAwesomeIcon style={{color: '#36B4B6', fontSize: '45px'}} icon={faUmbrella} />
                                <h5 className="mt-3">INSURED AND BONDED</h5>
                                <p className="service-disc">Our cleaners are insured and bonded so no need to worry about your apartment, office or garden.</p>
                            </div>
                        </Fade>                      
                    </Col>
                    <Col md={6} className="text-center">
                        <Zoom>
                            <img className="w-80 img-fluid img-thumbnail" style={{borderRadius: '50%'}} src={babyImg} alt="" />
                        </Zoom>
                    </Col>
                    <Col md={3}>
                        <Fade right>
                            <div>
                                <FontAwesomeIcon style={{color: '#36B4B6', fontSize: '45px'}} icon={faHome} />
                                <h5 className="mt-3">LEADING TECHNOLOGIES</h5>
                                <p className="service-disc">We use safe hospital-grade disinfectants, HEPA filtrations and microfiber cleaning cloths to reduce cross contamination.</p>
                            </div>
                        </Fade>
                        
                        <Fade right>
                            <div>
                                <FontAwesomeIcon style={{color: '#36B4B6', fontSize: '45px'}} icon={faFemale} />
                                <h5 className="mt-3">RELIABLE CREWS</h5>
                                <p className="service-disc">Our reliable and stable crews understand your specific house and office clearning service needs.</p>
                            </div>
                        </Fade>
                    </Col>
                </Row>
                <div className="text-center mt-5 mb-5">
                    <button className="btn-more">Learn More</button>
                </div>
            </Container>
            <section className="mb-5 section-container">
                    <div className="title-container">
                        <h3 className="env-title">NOTHING IS MORE IMPORTANT</h3>
                        <hr className="env-hr" />
                        <h4 className="env-footer">We prioritize the following.</h4>
                    </div>
                    <div>
                        <div className="container mt-5">
                            <Row>
                                {
                                    envInfo.map((data, i) => <EnvItem data={data} key={i} changeData={changeData} id={i} /> )
                                }
                            </Row>
                            <p className="desc-style">{description}</p>
                        </div>
                    </div>
            </section>
        </div>
    );
};

export default MainSection;