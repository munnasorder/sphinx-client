import React, { useContext, useEffect, useState } from 'react';
import SwiperCore, {Autoplay, Pagination, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';
import './review.css'
import ReactStars from "react-rating-stars-component";
import { UserContext } from '../../../../App';
import { useHistory } from 'react-router';
import axios from 'axios'

const ClientReview = () => {

  SwiperCore.use([Autoplay, Pagination, A11y]);

    const history = useHistory();
    const [loggedInUser] = useContext(UserContext)
    const [review, setReview] = useState([]);
    const [rating, setRating] = useState(0);
    const [feedback, setFeedback] = useState('');
    const [yourReview, setYourReview] = useState();
    const [stateChange, setStateChange] = useState(false);
    const userEmail = loggedInUser.email;

    useEffect(() => {
      async function fetchData () {
        // get all review
        const getAllReviews = await axios.get('https://salty-eyrie-56006.herokuapp.com/getReview');
        setReview(getAllReviews.data)
        // get user single review
        const getUserReviews = await axios.get(`https://salty-eyrie-56006.herokuapp.com/getSingleReview/${userEmail}`);
        setYourReview(getUserReviews.data)
      }
      fetchData();
    }, [stateChange])

    const ratingChanged = (newRating) => {
      setRating(newRating);
    };

    const handleSubmit = (e) => {
      if (loggedInUser.email) {
        if (rating > 0 && feedback.length > 0) {
          const userReview = {
            image: loggedInUser.photoURL,
            name: loggedInUser.displayName,
            star: rating,
            feedback: feedback,
            email: userEmail
          }
          // post user review
          fetch('https://salty-eyrie-56006.herokuapp.com/addReview', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(userReview)
          })
          .then(res => res.json())
          .then(data => setStateChange(!stateChange))
        }
      } else {
       history.push('/login')
      }

      e.preventDefault();
    }

    return (
      <div>
        <Swiper
        autoplay={{
          "delay": 3000,
          "disableOnInteraction": false
        }}
        spaceBetween={20}
        breakpoints={{
          // when window width is >= 640px
          640: {
            width: 640,
            slidesPerView: 1,
          },
          // when window width is >= 768px
          768: {
            width: 768,
            slidesPerView: 3,
          },
        }}
        pagination={{ clickable: true }}
      >
        {
          review?.map((doc, i) => (
            <SwiperSlide className="review-slide" key={i}>
              <div className="text-center">
                <div className="image-container">
                  <img className="img-fluid slide-image" src={doc.image} alt="" />
                </div>
                <h6>{doc.name}</h6>
                <div className="rating-container">
                  <ReactStars
                    edit={false}
                    value={doc.star}
                    isHalf={true}
                    size={24}
                    activeColor="#ffd700"
                  />
                </div>
                <p className="review-descriptions">{doc.feedback}</p>
              </div>
            </SwiperSlide>
          ))
        }
      </Swiper>
      <div className="give-rating-container">
        {
          yourReview ?
          <div className="pt-5">
            <div className="text-center">
                <div className="image-container">
                  <img className="img-fluid slide-image" src={yourReview.image} alt="" />
                </div>
                <h6>{yourReview.name}</h6>
                <div className="rating-container">
                  <ReactStars
                    edit={false}
                    value={yourReview.star}
                    isHalf={true}
                    size={24}
                    activeColor="#ffd700"
                  />
                </div>
                <p className="review-description">{yourReview.feedback}</p>
              </div>
          </div> :
          <form onSubmit={handleSubmit}>
          <input
            onChange={(e) => setFeedback(e.target.value)}
            name="feedback"
            className="form-control"
            type="text"
            placeholder="Give Your Feedback"
            required
          />           
          <div className="review-area">
            <div>
              <ReactStars                   
                count={5}
                onChange={ratingChanged}
                size={40}
                isHalf={true}
                activeColor="#ffd700"
              />
              <button className="review-submit-btn" type="submit">Submit</button>
            </div>
          </div>
        </form>
        }
      </div>
    </div>
    );
};

export default ClientReview;