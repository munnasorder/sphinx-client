import React, { useState } from 'react';
import { Col, Row, Spinner } from 'react-bootstrap';
import SideNav from './SideNav';
import axios from 'axios';
import { useFormik } from 'formik';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileImage } from '@fortawesome/free-solid-svg-icons'

const AddService = () => {
  const [imageUrl, setImageUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const initialValues = {
    name: '',
    description: '',
  }

  const handleImage = (event) => {
    setLoading(true)
    setImageUrl('')
    const imageData = new FormData();
    imageData.set('key', '97d66b6bdc5e8d57cad48ebc23a94884');
    imageData.append('image', event.target.files[0])
    axios.post('https://api.imgbb.com/1/upload', imageData)
    .then(function (response) {
      setLoading(false)
      setImageUrl(response.data.data.display_url);
    })
    .catch(function (error) {
      setLoading(false)
      alert("image upload problem");
    });
  }

  const onSubmit = (values) => {
    const serviceObject = {
      name: values.name,
      description: values.description,
      img: imageUrl,
    }
    fetch('https://salty-eyrie-56006.herokuapp.com/addService',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(serviceObject)
    })
    .then(res => res.json())
    .then(result => {
      if(result){
        alert("service added successfully")
      }
    })
  }
  const formik = useFormik( {
    initialValues,
    onSubmit,
  })

  return (
    <div className="">
      <Row style={{margin: '0', padding: '0 50px 0 0'}}>
          <Col className="m-0 p-0" md={3}>
         <SideNav />
        </Col>
        <Col md={9} className="service-container">
          <h3 style={{fontWeight: 'bold'}}>Add Service</h3>
          <form onSubmit={formik.handleSubmit}>
            <Row className="add-product-container">
              <Col md={6}>
                <h5>Service Name</h5>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter service name"
                  className="form-control mb-4"
                  value={formik.values.service}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  required
                />
                <h5>Description</h5>
                <input
                  type="text"
                  name="description"
                  placeholder="Description"
                  className="form-control"
                  value={formik.values.price}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  required
                />
              </Col>
              <Col md={6}>
                  <h5>Add Photo</h5>
                  {
                    loading ? (
                        <Spinner animation="border" />
                    ) : (
                      <>
                        <label htmlFor="file" className="custom-input">
                        <FontAwesomeIcon icon={faFileImage} />&nbsp;
                        Upload Photo
                        </label>
                        <input
                          onChange={handleImage}
                          type="file"
                          name="file"
                          id="file"
                        />                     
                      </>
                    )
                  }
              </Col>
            </Row>
            <div className="d-flex justify-content-end mt-4">
              <button type="submit" className="save-btn">Save</button>
            </div>
          </form>
        </Col>
      </Row>
    </div>
  );
};

export default AddService;