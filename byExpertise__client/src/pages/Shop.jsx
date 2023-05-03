import React, { useState } from "react";

import CommonSection from "../components/UI/CommonSection";
import Helmet from "../components/Helmet/Helmet";
import { Container, Row, Col } from "reactstrap";
import "../styles/shop.css";
import products from "./../assets/data/products";
import ProductList from "../components/UI/ProductList";
function Shop(coursesDataArr) {
  const [productsData, setProductsData] = useState(
    coursesDataArr.coursesDataArr.coursesDataArr
  );
  console.log("Products from assets", products);
  console.log(
    "coursesDataArr from api",
    coursesDataArr.coursesDataArr.coursesDataArr
  );

  const arr = [
    "twod_animation",
    "threed_animation",
    "character_animation",
    "threed_modelling",
    "concept_art",
    "digital_painting",
    "drawing",
    "illustration",
    "rendering",
    "comic_book_illustration",
    "brand_design",
    "product_design",
    "creativity",
    "digital_publishing",
    "fashion_design",
    "logo_design",
    "banner_design",
    "poster_design",
    "typography",
    "visual_effects",
    "threed",
    "composing",
    "keying",
    "motion_graphics",
    "oil_painting",
    "acrylic_painting",
    "procreate_art",
    "sketching",
    "pencil_art",
    "photography",
    "digital_photography",
    "photography_mobile",
    "potrait_photography",
    "macro_photography",
    "commercial_photography",
    "architectural_photography",
    "landscape_photography",
    "photoshop",
    "blender",
    "level_design",
    "unreal_engine",
    "unity",
    "digital_game_art",
    "pixel_art",
    "game_development",
    "premier_pro",
    "illustrator",
    "after_effects",
    "autocad",
    "sketch",
    "lightroom",
    "autodesk",
    "procreate",
    "maya",
    "film_making",
    "cinematography",
    "video_editing",
    "mobile_video_editing",
    "video_film_production",
    "video_audio",
    "video_gears",
  ];
  const handleFilter = (e) => {
    const filterValue = e.target.value;
    if (filterValue === "Filter By Category") {
      setProductsData(coursesDataArr.coursesDataArr.coursesDataArr);
    } else {
      const filteredProducts = productsData?.filter(
        (item) => item.course_category === filterValue
      );
      setProductsData(filteredProducts);
    }
  };

  // const handleFilter = (e) => {
  //   const filterValue = e.target.value;
  //   if (filterValue === "painting") {
  //     const filteredProducts = products.filter(
  //       (item) => item.category === "painting"
  //     );
  //     setProductsData(filteredProducts);
  //   }

  //   if (filterValue === "VFX") {
  //     const filteredProducts = products.filter(
  //       (item) => item.category === "VFX"
  //     );
  //     setProductsData(filteredProducts);
  //   }

  //   if (filterValue === "Design") {
  //     const filteredProducts = products.filter(
  //       (item) => item.category === "Design"
  //     );
  //     setProductsData(filteredProducts);
  //   }

  //   if (filterValue === "Photography") {
  //     const filteredProducts = products.filter(
  //       (item) => item.category === "Photography"
  //     );
  //     setProductsData(filteredProducts);
  //   }
  //   if (filterValue === "Dance") {
  //     const filteredProducts = products.filter(
  //       (item) => item.category === "Dance "
  //     );
  //     setProductsData(filteredProducts);
  //   }
  // };
  const handleSearch = (e) => {
    const searchTerm = e.target.value;

    const searchedProducts = productsData?.filter((item) =>
      item.course_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setProductsData(searchedProducts);
  };

  return (
    <Helmet title="Shop">
      <CommonSection title="Courses" />
      <section>
        <Container className="">
          <Row>
            <Col lg="3" md="6">
              <div className="filter__widget">
                <select onChange={handleFilter}>
                  <option>Filter By Category</option>
                  {arr.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                {/* <select onChange={handleFilter}>
                  <option>Filter By Category</option>
                  <option value="painting">Painting</option>
                  <option value="VFX">VFX</option>
                  <option value="Design">Design</option>
                  <option value="Photography">Photography</option>
                  <option value="Dance">Dance</option>
                </select> */}
              </div>
            </Col>
            <Col lg="3" md="6"></Col>
            <Col lg="6" md="6">
              <div className="search__box">
                <input
                  type="text"
                  placeholder="Search "
                  onChange={handleSearch}
                />
                <span>
                  <i class="ri-search-line"></i>
                </span>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="pt-0">
        <Container>
          <Row>
            {productsData.length === 0 ? (
              <h1 className="text-center fs-4">No Product Found</h1>
            ) : (
              <ProductList data={productsData} />
            )}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
}

export default Shop;
