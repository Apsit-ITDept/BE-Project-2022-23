const express = require("express");
const router = express.Router();
const validateUser = require("../../helpers/validateUser");
const generateToken = require("../../helpers/generateToken");
const bcrypt = require("bcryptjs");
const pg = require("../../db-init/dbConn");

router.post("/user-recommendations", async (req, res, next) => {
  try {
    //Get db instance from app locals
    let { db } = req.app.locals;
    //If not available (usually while testing), reconnect.
    if (!db) {
      db = await pg.connect();
    }

    //Get email, password and name from the req body
    const {
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
    } = req.body;
    //if email, name or password is missing, return an error response
    if (!user_id) {
      throw {
        statusCode: 400,
        customMessage: `All parameters are required.${
          user_id ? "" : " user_id is required."
        }`,
      };
    }

    //If not, validate the data send by the client
    const userCategories = {
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

    //Create a new userCategory in the db
    const newUserCategory = await db.one(
      `insert into user_category_recommendations(user_id, twod_animation, threed_animation, character_animation, threed_modelling, concept_art, digital_painting, drawing, illustration, rendering, comic_book_illustration, brand_design, product_design, creativity, digital_publishing, fashion_design, logo_design, banner_design, poster_design, typography, visual_effects, threed, composing, keying, motion_graphics, oil_painting, acrylic_painting, procreate_art, sketching, pencil_art, photography, digital_photography, photography_mobile, potrait_photography, macro_photography, commercial_photography, architectural_photography, landscape_photography, photoshop, blender, level_design, unreal_engine, unity, digital_game_art, pixel_art, game_development, premier_pro, illustrator, after_effects, autocad, sketch, lightroom, autodesk, procreate, maya, film_making, cinematography, video_editing, mobile_video_editing, video_film_production, video_audio, video_gears)
       values(${user_id}, ${twod_animation}, ${threed_animation}, ${character_animation}, ${threed_modelling}, ${concept_art}, ${digital_painting}, ${drawing}, ${illustration}, ${rendering}, ${comic_book_illustration}, ${brand_design}, ${product_design}, ${creativity}, ${digital_publishing}, ${fashion_design}, ${logo_design}, ${banner_design}, ${poster_design}, ${typography}, ${visual_effects}, ${threed}, ${composing}, ${keying}, ${motion_graphics}, ${oil_painting}, ${acrylic_painting}, ${procreate_art}, ${sketching}, ${pencil_art}, ${photography}, ${digital_photography}, ${photography_mobile}, ${potrait_photography}, ${macro_photography}, ${commercial_photography}, ${architectural_photography}, ${landscape_photography}, ${photoshop}, ${blender}, ${level_design}, ${unreal_engine}, ${unity}, ${digital_game_art}, ${pixel_art}, ${game_development}, ${premier_pro}, ${illustrator}, ${after_effects}, ${autocad}, ${sketch}, ${lightroom}, ${autodesk}, ${procreate}, ${maya}, ${film_making}, ${cinematography}, ${video_editing}, ${mobile_video_editing}, ${video_film_production}, ${video_audio}, ${video_gears} ) returning user_id`
    );

    //Return positive response to the client
    res.status(200).json({
      status: 200,
      message: "user category recommendations added successfully",
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
});

router.post("/get-user-recommendations", async (req, res, next) => {
  const { user_id } = req.body;
  try {
    let { db } = req.app.locals;

    //If not available (usually while testing), reconnect.
    if (!db) {
      db = await pg.connect();
    }
    const getUSerId = await db.one(
      `select * from user_category_recommendations where user_id = ${user_id} `
    );
    //Add the id to the user object

    console.log("in user recommendations", getUSerId.user_id);

    //Return positive response to the client
    res.status(200).json({
      status: 200,
      getUSerId,
    });
  } catch (err) {
    res.status(200).json({
      status: 404,
      user_id,
    });
  }
});

module.exports = router;
