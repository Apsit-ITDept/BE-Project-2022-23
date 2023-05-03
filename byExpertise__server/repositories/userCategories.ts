// import { app } from "../index";
// // import { logger } from "../utils/logger";
// // import { ICard } from "./../interface/ICards";
// // import ShortUniqueId from "short-unique-id";
// // import { generateNumber } from "../helper/KeyGenerator";

// const createUserCategoryWithUserId = async (testUserCategoryData: any) => {
//   try {
//     await app.locals
//       .DB`insert into user_categories(user_id, twod_animation, threed_animation, character_animation, threed_modelling, concept_art, digital_painting, drawing, illustration, rendering, comic_book_illustration, brand_design, product_design, creativity, digital_publishing, fashion_design, logo_design, banner_design, poster_design, typography, visual_effects, threed, composing, keying, motion_graphics, oil_painting, acrylic_painting, procreate_art, sketching, pencil_art, photography, digital_photography, photography_mobile, potrait_photography, macro_photography, commercial_photography, architectural_photography, landscape_photography, photoshop, blender, level_design, unreal_engine, unity, digital_game_art, pixel_art, game_development, premier_pro, illustrator, after_effects, autocad, sketch, lightroom, autodesk, procreate, maya, film_making, cinematography, video_editing, mobile_video_editing, video_film_production, video_audio, video_gears) values(${testUserCategoryData.user_id},${testUserCategoryData.twod_animation},0,0,0,0,0,1,1,0,1,1,1,0,0,1,0,1,1,1,1,0,0,0,0,1,0,1,1,0,1,0,0,1,0,1,1,0,1,1,0,0,1,0,1,1,0,1,0,0,1,1,1,0,0,1,1,1,0,0,0,0)`;

//     return { success: true };
//   } catch (error) {
//     logger.info(`at Repository/cards.ts ${error}`);
//     return { success: false };
//   }
// };

// export default {
//   createUserCategoryWithUserId,
// };

// // insert into customer_cards(id, card_number, customer_id, name_on_the_card, card_network_id, card_type_id,card_background_id,pin , valid_from, valid_to, cvv,  status, balance )
// //       values(DEFAULT, ${testCardData.card_number},${testCardData.customer_id},
// //               ${testCardData.name_on_the_card},${testCardData.card_network_id},${testCardData.card_type_id},${testCardData.card_background_id}, ${testCardData.pin},
// //               ${testCardData.valid_from},${testCardData.valid_to},
// //               ${testCardData.cvv},${testCardData.status}, ${testCardData.balance})
