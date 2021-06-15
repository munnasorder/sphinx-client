import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import './footer.css'
import call from '../../images/icon/phone-call.svg';
import mapIcon from '../../images/icon/map.svg';
import serviceIcon from '../../images/icon/24-hours.svg';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkerAlt, faAddressCard, faEnvelope, faClock, } from '@fortawesome/free-solid-svg-icons'
import { faFacebookF, faInstagram, faTwitter  } from '@fortawesome/free-brands-svg-icons'

const Footer = () => {
    const mainService = [
        {
            image: call,
            title: 'CALL US TODAY',
            about: '250 725 7052'
        },
        {
            image: mapIcon,
            title: 'Dhaka, Mirpur',
            about: '745 Adelaide St.'
        },
        {
            image: serviceIcon,
            title: '24/H Service',
            about: 'We Provide Our Best'
        }
    ]
    const serviceList = [
        "Commercial Cleaning",
        "House Cleaning",
        "Move In Out Service",
        "Post Renovation",
        "Window Cleaning",
        "Green Spaces Maintenance",
        "Novum Elementum",
        "Sicilium Polon"
    ]
    const latestPost = [
        {
            title: "How to: deep clean your kitchen",
            date: "January 11, 2021"
        },
        {
            title: "10 ways to save more & waste less",
            date: "March 17, 2021"
        },
        {
            title: "Before move-in cleaning checklist",
            date: "June 01, 2021"
        }
    ]
    const contactInfo = [
        {
            contact: "Mirpur-10, Dhaka, Bangladesh",
            icon: faMapMarkerAlt,
            hr: true
        },
        {
            contact: "Dhaka, Mirpur-10",
            icon: faAddressCard,
            hr: true
        },
        {
            contact: "contact@sphinx.com",
            icon: faEnvelope,
            hr: true
        },
        {
            contact: "Mon-Fri: 08.00 am - 05.00 pm",
            icon: faClock,
            hr: true
        },
        {
            contact: "Saturday, Sunday: closed",
            icon: faClock,
            hr: false
        }
    ]

    return (
        <footer style={{marginTop: '150px'}}>
            <section className="footer-header ">
                <Row style={{margin: '0'}}>
                    {
                        mainService.map((data, index) => (
                            <Col key={index} className="d-flex align-items-center justify-content-center" md={4}>
                                <div>
                                    <img width="60" className="img-fluid mr-5" src={data.image} alt="" />
                                </div>
                                <div>
                                    <label className="footer-service-title" htmlFor="about">{data.title}</label>
                                    <p style={{color: 'white'}}>{data.about}</p>
                                </div>
                            </Col>
                        ))
                    }
                </Row>
            </section>
            <main className="footer-main-container">
                <Container>
                    <Row style={{margin: '0'}}>
                        <Col xs={6} md={6} lg={3} xl={3} className="mb-3">
                            <h6 className="footer-features">ABOUT US</h6>
                            <p style={{marginTop: '13px'}} className="about">Founded in 1995 Sphinx quickly built a reputation as one of the leading providers of residential and commercial cleaning solutions. <br /> <br /> Our focus is to listen to our clients, understand their needs and provide the exceptional level of cleaning service.</p>
                            <button className="about-more-btn">Learn more</button>
                        </Col>
                        <Col xs={6} md={6} lg={3} xl={3} className="mb-3">
                            <h6 className="footer-features">OUR SERVICES</h6>
                            <ul className="service-items">
                                {
                                    serviceList.map((data, index) => (
                                        <li key={index}>
                                            <Link to="#/">{data}</Link>
                                        </li>
                                    ))
                                }
                            </ul>
                        </Col>
                        <Col xs={6} md={6} lg={3} xl={3} className="mb-3">
                            <h6 className="footer-features">LATEST POSTS</h6>
                            {
                                latestPost.map((data, index) => (
                                    <div className="post-container" key={index}>
                                        <Link to="#">{data.title}</Link>
                                        <p>{data.date}</p>
                                    </div>
                                ))
                            }
                        </Col>
                        <Col xs={6} md={6} lg={3} xl={3} className="mb-3">
                            <h6 className="footer-features">CONTACT INFO</h6>
                            {
                                contactInfo.map((data, index) => (
                                    <div className="" key={index}>
                                        <div className="d-flex" style={{color: '#fff'}}>
                                            <FontAwesomeIcon style={{fontSize: '20px'}} icon={data.icon} />&nbsp;&nbsp;&nbsp;
                                            <p>{data.contact}</p>
                                        </div>
                                        {data.hr ? <hr className="contact-hr" /> : null}
                                    </div>
                                ))
                            }
                        </Col>
                    </Row>
                    <section className="copyright-container">
                        <div className="d-flex justify-content-center pt-4 pb-4">
                            <button className="social-btn mr-3"><FontAwesomeIcon icon={faFacebookF} /></button>
                            <button className="social-btn mr-3"><FontAwesomeIcon icon={faInstagram} /></button>
                            <button className="social-btn"><FontAwesomeIcon icon={faTwitter} /></button>
                        </div>
                        <div style={{color: '#fff', textAlign: 'center'}}>
                            <span>&copy; Copyright Munna Islam {new Date().getFullYear()}</span>
                        </div>
                    </section>
                </Container>
            </main>
        </footer>
    );
};

export default Footer;