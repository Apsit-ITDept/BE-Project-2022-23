import React, { useState, useRef, useEffect } from "react";

import { Container, Row, Col } from "reactstrap";
import { useParams } from "react-router-dom";
import CommonSection from "../components/UI/CommonSection";
import products from "./../assets/data/products";
import Helmet from "./../components/Helmet/Helmet";
import "../styles/product-details.css";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { cartActions } from "./../redux/slices/cartSlices";
import { ToastContainer, toast } from "react-toastify";
import dummyImg from "../assets/images/online_course_gradient_image.jpg";
import StarRating from "../components/UI/StarRating";
import getUser from "../helpers/DecodeJwt";
import axios from "axios";
import { API_URL } from "../actions/serverConnection";
import { MDBBtn } from "mdb-react-ui-kit";

function ProductDetails(coursesDataArr) {
  const [tab, setTab] = useState("desc");
  const { course_id } = useParams();

  // console.log("course_id", course_id);
  const dispatch = useDispatch();
  const course_data = coursesDataArr.coursesDataArr.coursesDataArr;
  const product = course_data.find(
    (course) => course.course_id === parseInt(course_id)
  );
  const [rating, setRating] = useState(0);

  const handleRating = (ratingValue) => {
    setRating(ratingValue);
  };
  console.log("ratings", rating);

  // const {
  //   imgUrl,
  //   productName,
  //   price,
  //   avgRating,
  //   reviews,
  //   description,
  //   shortDesc,
  //   category,
  // } = product;

  const { course_name, course_price, course_description, course_category } =
    product;

  const addToCart = () => {
    dispatch(
      cartActions.addItem({
        course_id,
        course_name,
        course_price,
        image: dummyImg,
      })
    );

    toast.success("Course added successfully");
  };

  const handleRatingClick = () => {
    const userData = getUser();
    const user_id = parseInt(userData.id);
    const ratings = rating;
    console.log("userId", user_id);
    console.log("course_id", course_id);
    console.log("ratings", ratings);

    const sendData = async (user_id, course_id, ratings) => {
      try {
        const dummyRating = await axios.post(`${API_URL}/user/user-ratings`, {
          user_id,
          course_id,
          ratings,
        });
        console.log(dummyRating.data.message);
      } catch (error) {
        console.error(error);
      }
    };
    sendData(user_id, course_id, ratings);
    // navigate("/home");
  };

  return (
    <Helmet>
      <CommonSection />
      <section className="pt-0">
        <Container>
          <Row>
            <Col lg="6" className="productDetailImg">
              <img src={dummyImg} alt="" />
            </Col>
            <Col lg="6">
              <div className="product__details">
                <h2>{course_name}</h2>
                <div className="product__rating d-flex align-item-center gap-5 mb-3">
                  <div>
                    <StarRating onChange={handleRating} />
                    <MDBBtn
                      style={{ marginTop: "10px" }}
                      onClick={handleRatingClick}
                    >
                      Submit
                    </MDBBtn>
                  </div>
                  <p>{/* (<span>{avgRating}</span> Ratings) */}</p>
                </div>
                <div className="d-flex align-item-center gap-5">
                  <span className="product__price">{course_price}</span>
                  <p>Category: {course_category}</p>
                </div>
                <p className="mt-3">{course_description}</p>
                <motion.button
                  whileTap={{ scale: 1.2 }}
                  className="shop__btn"
                  onClick={addToCart}
                >
                  Enroll Me
                </motion.button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* <section>
        <Container>
          <Row>
            <Col lg="12">
              <div class="tab__wrapper d-flex align-item-center gap-5">
                <h6
                  className={`${tab === "desc" ? "active__tab" : ""}`}
                  onClick={() => setTab("desc")}
                >
                  Description
                </h6>
                <h6
                  className={`${tab === "rev" ? "active__tab" : ""}`}
                  onClick={() => setTab("rev")}
                >
                  Reviews ({reviews.length})
                </h6>
              </div>
              {tab === "desc" ? (
                <div className="tab-content mt-5">
                  <p>{description}</p>
                </div>
              ) : (
                <div className="product__review mt-5">
                  <div className="review__wrapper mt-5">
                    <ul>
                      {reviews?.map((item, index) => (
                        <li key={index}>
                          <span>{item.rating} (rating)</span>
                          <p>{item.text}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </Col>
          </Row>
        </Container>
      </section> */}
    </Helmet>
  );
}

export default ProductDetails;
