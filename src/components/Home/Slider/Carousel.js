import React from 'react';
import image1 from '../../../images/slider/image_01-1.jpg'
import image2 from '../../../images/slider/image_02-1.jpg'
import image3 from '../../../images/slider/image_03-2.jpg'
import Slider from 'react-animated-slider';
import 'react-animated-slider/build/horizontal.css';
import './carousel.css';
import NavBar from '../../NavBar/NavBar';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import {Fade, Zoom, Bounce } from 'react-reveal';

const Carousel = () => {
    const content = [
        {
            title: "OUR TEAM IS OUR MOST VALUABLE RESOURCE",
            description: "Sphinx operates in Ottawa and provides a variety of cleaning services. Choose us because of our reputation for excellence.",
            button: "GET SERVICE",
            image: image1,
          },
          {
            title: "CONTINUOUS PURSUIT FOR PERFECTION ",
            description:
              "We use safe hospital-grade disinfectants, HEPA filtrations and microfiber cleaning cloths to reduce cross contamination.",
            button: "GET SERVICE",
            image: image2,
          },
          {
            title: "WE PROVIDE BEST SERVICES",
            description:
              "Our cleaners are insured and bonded so no need to worry about your apartment, office or garden",
            button: "GET SERVICE",
            image: image3,
          },
    ]


    return (
      <div>
        <div style={{position: 'relative'}}>
          <Slider className="slider-wrapper" autoplay={5000}>
                {content.map((item, index) => (
                  <div
                    key={index}
                    className="slider-content"
                    style={{ background: `url('${item.image}') no-repeat center center` }}
                  >
                    <div className="inner">
                      <Fade left>
                        <h1 className="slider-header">{item.title}</h1>
                      </Fade>
                      <Zoom>
                        <p>{item.description}</p>
                      </Zoom>                                        
                      <Bounce right>
                        <Link to="#"><Button className="slider-main-btn">{item.button}</Button></Link>
                      </Bounce>                     
                    </div>
                  </div>
                ))}
          </Slider>
        </div>
        <div style={{position: 'absolute', top: '0', width: '100%'}}>
          <NavBar />
        </div>
      </div>
    );
};

export default Carousel;