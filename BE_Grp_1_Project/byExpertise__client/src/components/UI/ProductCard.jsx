import React from "react";
import productImg from "../../assets/images/arm-chair-01.jpg";
import { motion } from "framer-motion";

import "../../styles/product-card.css";
import { Col } from "reactstrap";
import { Link } from "react-router-dom";
import { NavLink, useNavigate } from "react-router-dom";
import dummyImg from "../../assets/images/online_course_gradient_image.jpg";
import { useDispatch } from "react-redux";
import { cartActions } from "./../../redux/slices/cartSlices";
import { ToastContainer, toast } from "react-toastify";

const ProductCard = ({ item }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const navigateToCourse = () => {
    navigate(`/shop/${item.course_id}`);
  };

  const addToCart = () => {
    dispatch(
      cartActions.addItem({
        course_id: item.course_id,
        productName: item.course_name,
        price: item.course_price,
        imgUrl: dummyImg,
      })
    );

    toast.success("Product added successfully");
  };
  return (
    <Col lg="3" md="4" className="mb-2">
      <div className="product__item">
        <div>
          <motion.img
            className="product__img"
            whileHover={{ scale: 0.9 }}
            src={dummyImg}
            alt=""
          />
        </div>
        <div className="p-2 product__info">
          <div onClick={navigateToCourse} className="product__name">
            {item.course_name}
          </div>
          <span>{item.course_category}</span>
          <div>
            <div>
              <span>
                <i class="ri-star-fill"></i>
              </span>
              <span>
                <i class="ri-star-fill"></i>
              </span>
              <span>
                <i class="ri-star-fill"></i>
              </span>
              <span>
                <i class="ri-star-fill"></i>
              </span>
              <span>
                <i class="ri-star-half-line"></i>
              </span>
            </div>

            <span> Ratings</span>
          </div>
        </div>
        <div className="product__card-bottom d-flex align-item-center justify-content-between p-2">
          <span className="price">{item.course_price}</span>
          <motion.span whileTap={{ scale: 1.2 }} onClick={addToCart}>
            <i class="ri-add-line"></i>
          </motion.span>
        </div>
      </div>
    </Col>
  );
};

export default ProductCard;
