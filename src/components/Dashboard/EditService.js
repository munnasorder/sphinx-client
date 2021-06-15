import React, { useEffect, useState } from 'react';
import { Col, Row, Spinner } from 'react-bootstrap';
import SideNav from './SideNav';
import { useParams } from 'react-router';
import { useFormik } from 'formik'
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileImage } from '@fortawesome/free-solid-svg-icons'

const EditService = () => {

  let { id } = useParams()
  const [ service, setService ] = useState({});
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const initialValues = {
    name: service.name,
    description: service.description,
  }
// initial product load
  useEffect(() => {
    fetch(`https://salty-eyrie-56006.herokuapp.com/singleService/${id}`)
    .then(res => res.json())
    .then(data => setService(data))
  }, [])

  // handle image upload
  const handleImageUpload = (event) => {
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

  // product update function
  const onSubmit = (values) => {
    const updateService = {
      name: values.name,
      description: values.description,
      img: imageUrl,
    }
    fetch(`https://salty-eyrie-56006.herokuapp.com/editService/${id}`,{
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updateService)
    })
    .then(res => res.json())
    .then(result => {
      if(result) {
        alert("Product updated successfully")
      }
    })
  }
  
  const formik = useFormik( {
    initialValues,
    onSubmit
  })
    return (
        <div className="">
        <Row style={{margin: '0', padding: '0 50px 0 0'}}>
          <Col className="m-0 p-0" md={3}>
           <SideNav />
          </Col>
          <Col md={9} className="edit-container">
          <h3 style={{fontWeight: 'bold'}}>Edit Product</h3>
            <form onSubmit={formik.handleSubmit}>
              <Row className="add-product-container">
                <Col md={6}>
                  <h5>Change Name</h5>
                  <input
                    type="text"
                    name="name"
                    defaultValue={service.name}
                    placeholder="Enter Name"
                    className="form-control mb-4"
                    required
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <h5>Edit Description</h5>
                  <input
                    type="text"
                    name="description"
                    defaultValue={service.description}
                    placeholder="Enter Description"
                    className="form-control"
                    required
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </Col>
                <Col md={6}>
                    <h5>Change Photo</h5>
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
                          onChange={handleImageUpload}
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
                <input
                  type="submit"
                  className="save-btn"
                  value="Update"
                />
              </div>
            </form>           
        </Col>
        </Row>
      </div>
    );
};

export default EditService;