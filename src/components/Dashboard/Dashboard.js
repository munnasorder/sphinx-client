import React from 'react';
import { Col, Row, Spinner, Table } from 'react-bootstrap';
import './sideNav.css'
import { useEffect } from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import SideNav from './SideNav';

const Dashboard = () => {

  const history = useHistory()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [pageReload, setPageReload] = useState(false)
  useEffect(() => {
    setLoading(true)
    fetch('https://salty-eyrie-56006.herokuapp.com/allService')
    .then(res => res.json())
    .then(data => {
      setLoading(false)
      setProducts(data)
    })
    .catch(err => alert(err))
  }, [pageReload])

  const editProduct = (id) => {
    history.push(`/editProduct/${id}`)
  }

  const deleteProduct = (id) => {
    fetch(`https://salty-eyrie-56006.herokuapp.com/deleteService/${id}`,{
      method: 'DELETE'
    })
    .then(res => res.json())
    .then(result => {
      if(result){
        setPageReload(!pageReload)
      }
    })
  }

  return (
    <div className="">
      <Row style={{margin: '0', padding: '0 50px 0 0'}}>
        <Col className="m-0 p-0" md={3}>
         <SideNav />
        </Col>
        <Col md={9} className="dashboard-container">
          <h3 style={{fontWeight: 'bold'}}>Manage Service</h3>
          <div className="table-container">
            <Table borderless>
              <thead>
                <tr style={{backgroundColor: '#f5f6fa'}}>
                  <th>Service Name</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
               {
                 loading ? (
                  <tr>
                    <td colSpan="4">
                      <Spinner animation="border" />
                    </td>
                  </tr>
                 ) : (
                    products.map((doc, index) => (
                       <tr key={index}>
                         <td>{doc.name}</td>
                         <td>
                           <button onClick={() => editProduct(doc._id)} className="edit-btn"><FontAwesomeIcon icon={faPencilAlt} /></button>
                           <button onClick={() => deleteProduct(doc._id)} className="delete-btn"><FontAwesomeIcon icon={faTrashAlt} /></button>
                         </td>
                       </tr>
                    ))
                 )
               }
              </tbody>
            </Table>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;