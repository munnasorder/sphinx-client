import React, { useContext, useEffect } from 'react';
import './sideNav.css'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faUserPlus, faPlusSquare, faTasks, faSpa } from '@fortawesome/free-solid-svg-icons';
import logo from '../../images/icon/logo.png'
import { useState } from 'react';
import { UserContext } from '../../App';

const SideNav = () => {
  
    const [allAdminEmail, setAllAdminEmail] = useState([]);
    const [loggedInUser] = useContext(UserContext);

    // filter admin email
    const findAdmin = allAdminEmail?.find(doc => doc.email === loggedInUser.email);

    useEffect(() => {
      fetch('https://salty-eyrie-56006.herokuapp.com/getAllAdmin')
      .then(response => response.json())
      .then(data => setAllAdminEmail(data))
    }, [])

    return (
        <div className="side-nav">
          <div className="pb-4">
            <Link to="/"><img width="100" className="img-fluid" src={logo} alt="" /></Link>
          </div>
        {
          findAdmin ? (
            <>
              <Link to="/dashboard" className="side-nav-item">
                <FontAwesomeIcon icon={faTasks} /> &nbsp;  Manage Service
              </Link>
              <Link to="/addProduct" className="side-nav-item">
                <FontAwesomeIcon icon={faPlusSquare} /> &nbsp; Add Service
              </Link>
              <Link to="addAdmin" className="side-nav-item">
                <FontAwesomeIcon icon={faUserPlus} /> &nbsp; Make Admin
              </Link>
              <Link to="#/" onClick={() => alert('Error its not write way')} className="side-nav-item">
                <FontAwesomeIcon icon={faPencilAlt} /> &nbsp; Edit Product
              </Link>
              <Link to="/plan" className="side-nav-item">
                <FontAwesomeIcon icon={faSpa} /> &nbsp; Plan And Pricing
              </Link>
            </>
          ) : (
            <Link to="/plan" className="side-nav-item">
              <FontAwesomeIcon icon={faSpa} /> &nbsp; Plan And Pricing
            </Link>
          )
        }       
      </div>
    );
};

export default SideNav;