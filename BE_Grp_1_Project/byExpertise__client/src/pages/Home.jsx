import React, { useState, useEffect, useContext } from "react";
import { getModelOutput } from "../actions/getModelOutput";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Helmet from "../components/Helmet/Helmet";
import { Container, Row, Col } from "reactstrap";
import heroImg from "../assets/images/hero-img.png";
import svgImg from "../assets/images/svg_img.svg";
import "../styles/home.css";
import { motion } from "framer-motion";
import Services from "../services/Services";
import ProductList from "../components/UI/ProductList";
import products from "./../assets/data/products";
import { observer } from "mobx-react-lite";
import store from "../actions/store";
import getUser from "./../helpers/DecodeJwt";
import axios from "axios";
import { API_URL } from "../actions/serverConnection";
import storeRatings from "../actions/storeRatings";
import { createRecommendations } from "./../actions/createRecommendations";
import { RecommendationContext } from "./../contexts/createRecommendations";
import { LoadingContext } from "../contexts/Loading";
import storeRecommendations from "../actions/storeRecommendations";

const Home = observer((coursesDataArr) => {
  const [model2Response, setModel2Response] = useState(null);
  const courseData = coursesDataArr.coursesDataArr.coursesDataArr;
  console.log("courseData", courseData);
  const userData = getUser();

  // const sendData = async (data) => {
  //   try {
  //     const response = await axios.post(
  //       `${API_URL}/model/user-data-model`,
  //       data
  //     );
  //     setModel2Response(response);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  // sendData(userData);
  // // console.log("model 2 output", model2Response?.data.data);
  // const model2Data = model2Response?.data.data;

  // const model2Arr = eval(
  //   `(${model2Data?.slice(
  //     model2Data.indexOf("["),
  //     model2Data?.lastIndexOf("]") + 1
  //   )})`
  // );
  // console.log("model 2 output", model2Response?.data.data);
  // console.log("model2Arr", model2Arr);

  // console.log("selected courses", selectedCourses);
  // console.log("user id", userData.id);
  const { modelOutput } = store;
  const { modelOutput2 } = storeRatings;
  const { dataToSend } = storeRecommendations;

  console.log("dataToSend", dataToSend);
  const sendRecommendation = axios.post(
    `${API_URL}/user/user-recommendations`,
    dataToSend
  );
  console.log(sendRecommendation);

  const model2Arr = modelOutput2;
  // console.log("model2Arr", model2Arr);
  const regex = /(?<=\[)[^,\]]+/g;

  const model2DataArr = model2Arr
    ?.substring(model2Arr.indexOf("[") + 1, model2Arr.indexOf("]"))
    .split(",")
    .map((str) => parseInt(str.trim()));

  // const model2DataArr = eval(
  //   `(${model2Arr?.slice(
  //     model2Arr.indexOf("["),
  //     model2Arr?.lastIndexOf("]") + 1
  //   )})`
  // );
  // console.log("modelOutput store in home", modelOutput);
  const [trendingProducts, settrendingProducts] = useState([]);
  const [bestSalesProducts, setbestSalesProducts] = useState([]);
  const year = new Date().getFullYear();
  const [mobileProducts, setMobileProducts] = useState([]);
  const [wirelessProducts, setWirelessProducts] = useState([]);
  const { state: recommendationState, dispatch: recommendationDispatch } =
    useContext(RecommendationContext);
  const { state: loadingState, dispatch: loadingDispatch } =
    useContext(LoadingContext);

  const modelSelectedCategoriesArr = modelOutput
    ?.split(" ")
    .slice(2, -1)
    .filter((item) => item !== "");

  // console.log("modelSelectedCategoriesArr in home", modelSelectedCategoriesArr);

  const [productsData, setProductsData] = useState(
    coursesDataArr.coursesDataArr.coursesDataArr
  );

  // console.log(
  //   "coursesDataArr in home",
  //   coursesDataArr.coursesDataArr.coursesDataArr
  // );

  const category_list = [
    { twod_animation: 1 },
    { threed_animation: 2 },
    { character_animation: 3 },
    { threed_modelling: 4 },
    { concept_art: 5 },
    { digital_painting: 6 },
    { drawing: 7 },
    { illustration: 8 },
    { rendering: 9 },
    { comic_book_illustration: 10 },
    { brand_design: 11 },
    { product_design: 12 },
    { creativity: 13 },
    { digital_publishing: 14 },
    { fashion_design: 15 },
    { logo_design: 16 },
    { banner_design: 17 },
    { poster_design: 18 },
    { typography: 19 },
    { visual_effects: 20 },
    { threed: 21 },
    { composing: 22 },
    { keying: 23 },
    { motion_graphics: 24 },
    { oil_painting: 25 },
    { acrylic_painting: 26 },
    { procreate_art: 27 },
    { sketching: 28 },
    { pencil_art: 29 },
    { photography: 30 },
    { digital_photography: 31 },
    { photography_mobile: 32 },
    { potrait_photography: 33 },
    { macro_photography: 34 },
    { commercial_photography: 35 },
    { architectural_photography: 36 },
    { landscape_photography: 37 },
    { photoshop: 38 },
    { blender: 39 },
    { level_design: 40 },
    { unreal_engine: 41 },
    { unity: 42 },
    { digital_game_art: 43 },
    { pixel_art: 44 },
    { game_development: 45 },
    { premier_pro: 46 },
    { illustrator: 47 },
    { after_effects: 48 },
    { autocad: 49 },
    { sketch: 50 },
    { lightroom: 51 },
    { autodesk: 52 },
    { procreate: 53 },
    { maya: 54 },
    { film_making: 55 },
    { cinematography: 56 },
    { video_editing: 57 },
    { mobile_video_editing: 58 },
    { video_film_production: 59 },
    { video_audio: 60 },
    { video_gears: 61 },
  ];

  const getCategory = async () => {
    const categories = [];
    for (const id of modelSelectedCategoriesArr) {
      const category = await Object.keys(category_list[parseInt(id) - 1])[0];
      categories.push(category);
    }
    return categories;
  };
  getCategory().then(async (categories) => {
    const selectedCourses = courseData?.filter((item) =>
      model2DataArr?.includes(item.course_id)
    );
    const categoryKeys = category_list.map((item) => Object.keys(item)[0]);
    const categoryMap = {};
    // console.log("categoryMap", categoryMap);

    categoryKeys.forEach((key) => {
      if (categories?.includes(key)) {
        categoryMap[key] = 1;
      } else {
        categoryMap[key] = 0;
      }
    });

    const {
      user_id = userData.id,
      twod_animation,
      threed_animation,
      character_animation,
      threed_modelling,
      concept_art,
      digital_painting,
      drawing,
      illustration,
      rendering,
      comic_book_illustration,
      brand_design,
      product_design,
      creativity,
      digital_publishing,
      fashion_design,
      logo_design,
      banner_design,
      poster_design,
      typography,
      visual_effects,
      threed,
      composing,
      keying,
      motion_graphics,
      oil_painting,
      acrylic_painting,
      procreate_art,
      sketching,
      pencil_art,
      photography,
      digital_photography,
      photography_mobile,
      potrait_photography,
      macro_photography,
      commercial_photography,
      architectural_photography,
      landscape_photography,
      photoshop,
      blender,
      level_design,
      unreal_engine,
      unity,
      digital_game_art,
      pixel_art,
      game_development,
      premier_pro,
      illustrator,
      after_effects,
      autocad,
      sketch,
      lightroom,
      autodesk,
      procreate,
      maya,
      film_making,
      cinematography,
      video_editing,
      mobile_video_editing,
      video_film_production,
      video_audio,
      video_gears,
    } = categoryMap;

    const dataToSend = {
      user_id,
      twod_animation,
      threed_animation,
      character_animation,
      threed_modelling,
      concept_art,
      digital_painting,
      drawing,
      illustration,
      rendering,
      comic_book_illustration,
      brand_design,
      product_design,
      creativity,
      digital_publishing,
      fashion_design,
      logo_design,
      banner_design,
      poster_design,
      typography,
      visual_effects,
      threed,
      composing,
      keying,
      motion_graphics,
      oil_painting,
      acrylic_painting,
      procreate_art,
      sketching,
      pencil_art,
      photography,
      digital_photography,
      photography_mobile,
      potrait_photography,
      macro_photography,
      commercial_photography,
      architectural_photography,
      landscape_photography,
      photoshop,
      blender,
      level_design,
      unreal_engine,
      unity,
      digital_game_art,
      pixel_art,
      game_development,
      premier_pro,
      illustrator,
      after_effects,
      autocad,
      sketch,
      lightroom,
      autodesk,
      procreate,
      maya,
      film_making,
      cinematography,
      video_editing,
      mobile_video_editing,
      video_film_production,
      video_audio,
      video_gears,
    };

    storeRecommendations.setDataToSend(dataToSend);

    const filteredBestSalesProducts = productsData?.filter((item) =>
      categories.includes(item.course_category)
    );
    const filteredMobileProducts = productsData?.filter(
      (item) => item.course_category === "macro_photography"
    );
    const filteredWirelessProducts = productsData?.filter(
      (item) => item.course_category === "oil_painting"
    );
    settrendingProducts(selectedCourses);
    setbestSalesProducts(filteredBestSalesProducts);
    setMobileProducts(filteredMobileProducts);
    setWirelessProducts(filteredWirelessProducts);
  });
  // const getCategoryList = async () => {
  //   const categories = await getCategory();

  //   return categoryMap;
  // };

  // const printCategoryList = async () => {
  //   try {
  //     const result = await getCategoryList();

  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  //   const filteredTrendingProducts = products.filter(
  //     (item) => item.category === "Design"
  //   );
  //   const filteredBestSalesProducts = products?.filter(
  //     (item) => (item) => item.category === "Design"
  //   );
  //   const filteredMobileProducts = products.filter(
  //     (item) => item.category === "VFX"
  //   );
  //   const filteredWirelessProducts = products.filter(
  //     (item) => item.category === "Dance"
  //   );

  //   settrendingProducts(filteredTrendingProducts);
  //   setbestSalesProducts(filteredBestSalesProducts);
  //   setMobileProducts(filteredMobileProducts);
  //   setWirelessProducts(filteredWirelessProducts);
  // });

  // const getRecommendation = await axios.post(
  //   `${API_URL}/user/get-user-recommendations`,
  //   user_id
  // );
  // console.log("getRecommendation", getRecommendation);
  // if ((getRecommendation.status = 404)) {
  //   const sendRecommendation = await axios.post(
  //     `${API_URL}/user/user-recommendations`,
  //     dataToSend
  //   );
  //   console.log("sendRecommendation", sendRecommendation);
  // }
  // if (!getRecommendation) {
  //   const sendRecommendation = await axios.post(
  //     `${API_URL}/user/user-recommendations`,
  //     dataToSend
  //   );
  //   console.log(sendRecommendation, "sendRecommendation");
  // }

  // console.log("sendRecommendation", getRecommendation);

  useEffect(() => {
    // Your useEffect code here
    const dummnyCatgories = [
      "unreal_engine",
      "motion_graphics",
      "acrylic_painting",
      "maya",
    ];
    const filteredTrendingProducts = courseData?.filter((item) =>
      dummnyCatgories.some((category) =>
        item.course_category.includes(category)
      )
    );
    const filteredTrendingProducts2 = courseData?.filter(
      (item) => item.course_category === "unreal_engine"
    );
    const filteredBestSalesProducts = courseData?.filter(
      (item) => item.course_category === "drawing"
    );
    const filteredMobileProducts = courseData?.filter(
      (item) => item.course_category === "macro_photography"
    );
    const filteredWirelessProducts = courseData?.filter(
      (item) => item.course_category === "oil_painting"
    );

    settrendingProducts(filteredTrendingProducts);
    setbestSalesProducts(filteredBestSalesProducts);
    setMobileProducts(filteredMobileProducts);
    console.log("filteredMobileProducts", filteredMobileProducts);
    setWirelessProducts(filteredWirelessProducts);
    console.log("filteredWirelessProducts", filteredWirelessProducts);
  }, []);

  return (
    <Helmet title={"Home"}>
      <section className="hero__section">
        <Container>
          <Row>
            <Col lg="6" md="6">
              <div className="hero__content">
                <p className="hero__subtitle">
                  Leading Course Platform in {year}
                </p>
                <h2>Learn Endless</h2>
                <p>
                  Lorem Ipsum has been the industry's standard dummy text ever
                  since the 1500s, when an unknown printer took a galley of type
                  and scrambled it to make a type specimen book.
                </p>
                <motion.button whileTap={{ scale: 1.2 }} className="shop__btn">
                  <Link to="/shop" style={{ color: "white" }}>
                    GET COURSES
                  </Link>
                </motion.button>
              </div>
            </Col>
            <Col lg="6" md="6">
              <div className="hero__img">
                <img src={svgImg} alt="" />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <Services />
      <section className="trending__products">
        <Container>
          <Row>
            <Col lg="12" className="text-center">
              <h2 className="section__title">Trending Courses</h2>
            </Col>
            <ProductList data={trendingProducts} />
          </Row>
        </Container>
      </section>
      <section className="best__sales">
        <Container>
          <Row>
            <Col lg="12" className="text-center">
              <h2 className="section__title">Personalized Recommendations</h2>
            </Col>
            <ProductList data={bestSalesProducts} />
          </Row>
        </Container>
      </section>
      <section className="new__arrivals">
        <Container>
          <Row>
            <Col lg="12" className="text-center">
              <h2 className="section__title">New Arrivals</h2>
            </Col>
            <ProductList data={mobileProducts} />
            <ProductList data={wirelessProducts} />
          </Row>
        </Container>
      </section>
    </Helmet>
  );
  // your component code using the modelOutput data
});

// const Home = (coursesDataArr) => {

// };

export default Home;
