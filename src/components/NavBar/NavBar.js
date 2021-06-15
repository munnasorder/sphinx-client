import React, { useContext, useEffect, useRef, useState } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './nav.css';
import logo from '../../images/icon/logo.png';
import logo2 from '../../images/icon/logo2.svg';
import { UserContext } from '../../App';
import axios from 'axios';

const NavBar = () => {
  const [loggedInUser] = useContext(UserContext);
  const [allAdminEmail, setAllAdminEmail] = useState([]);

    // sticky nav function & animation start
    const [navBackground, setNavBackground] = useState(false)
    const navRef = useRef()
    navRef.current = navBackground
    useEffect(() => {
      const handleScroll = () => {
        const show = window.scrollY > 50
        if (navRef.current !== show) {
          setNavBackground(show)
        }
      }
      document.addEventListener('scroll', handleScroll)
      return () => {
        document.removeEventListener('scroll', handleScroll)
      }
    }, [])
    // sticky nav function & animation end


    // filter admin email
    const findAdmin = allAdminEmail?.find(doc => doc.email === loggedInUser.email);

    useEffect(() => {
      async function fetchData () {
        const data = await axios.get('https://salty-eyrie-56006.herokuapp.com/getAllAdmin')
        setAllAdminEmail(data.data)
      }
      fetchData();
    }, [])

    return (
        <Navbar expand="lg" fixed="top" className={navBackground ? 'stickyOn' : 'stickyOff'} style={{transition: '1s ease'}}>
            <Container>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Link className={navBackground ? 'nav-link-item nav-link' : 'nav-link nav-t'} to="#home">Home</Link>
                    <Link className={navBackground ? 'nav-link-item nav-link' : 'nav-link nav-t'} to="#link">Service</Link>
                    <Link className={navBackground ? 'nav-link-item nav-link' : 'nav-link nav-t'} to="#home">Our Team</Link>
                    <Link className={navBackground ? 'nav-link-item nav-link' : 'nav-link nav-t'} to="#link">Our Portfolio</Link>
                </Nav>
                <Nav className="m-auto">
                  {
                    navBackground ? (
                    <>
                      <img width="65px" className="img-fluid" src={logo2} alt="logo" />
                      <Link className={navBackground ? 'nav-link-item nav-link' : 'nav-link nav-t'} to="/" style={{fontSize: '25px'}}>Sphinx</Link>
                    </> ) : (
                    <>
                      <img width="65px" className="img-fluid" src={logo} alt="logo" />
                      <Link className={navBackground ? 'nav-link-item nav-link' : 'nav-link nav-t'} to="/" style={{fontSize: '25px'}}>Sphinx</Link>
                    </>)
                  }
                    
                </Nav>
                <Nav className="ml-auto">
                    <Link className={navBackground ? 'nav-link-item nav-link' : 'nav-link nav-t'} to={findAdmin ? '/dashboard' : '/plan'}>Dashboard</Link>
                    <Link className={navBackground ? 'nav-link-item nav-link' : 'nav-link nav-t'} to="#link">About</Link>
                    <Link className={navBackground ? 'nav-link-item nav-link' : 'nav-link nav-t'} to="#home">Contact Us</Link>
                    {
                      loggedInUser.email ?
                      <Link className={navBackground ? 'nav-link-item nav-link' : 'nav-link nav-t'} to="/user">{loggedInUser.displayName}</Link> :
                      <Link className={navBackground ? 'nav-link-item nav-link' : 'nav-link nav-t'} to="/login">Login</Link>
                    }
                </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavBar;