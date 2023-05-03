import { History } from "history";
import { useState, useContext } from "react";
import { startLoading, stopLoading } from "./loading";
import { Actions as LoadingActions } from "../reducers/loading";
import axios from "axios";
import {
  CREATE_CATEGORY,
  CREATE_CATEGORY_ERROR,
  CLEAR_CREATE_CATEGORY_ERROR,
} from "./Types";
import { Actions } from "../reducers/createCategory";
import { API_URL } from "./serverConnection";
import ModelOutputContext from "../contexts/ModelOutputContext";
import getUser from "../helpers/DecodeJwt";
import storeRatings from "./storeRatings";
export const createCategory =
  (
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
    video_gears
  ) =>
  async (dispatch, loadingDispatch) => {
    const [modelOutput, setModelOutput] = useState(null);
    const { setModelOutputContext } = useContext(ModelOutputContext);
    try {
      startLoading(loadingDispatch);
      const result = await axios.post(`${API_URL}/user/user-categories`, {
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
      });
      console.log("data to actions", {
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
      });
      const modelOutput = await axios.get(`${API_URL}/model/run-python`, {});
      const [model2Response, setModel2Response] = useState(null);
      const userData = getUser();
      const sendData = async (data) => {
        try {
          const response = await axios.post(
            `${API_URL}/model/user-data-model`,
            data
          );
          setModel2Response(response);
        } catch (error) {
          console.error(error);
        }
      };
      sendData(userData.id);
      // console.log("model 2 output", model2Response?.data.data);
      const model2Data = model2Response?.data.data;

      const model2Arr = eval(
        `(${model2Data?.slice(
          model2Data.indexOf("["),
          model2Data?.lastIndexOf("]") + 1
        )})`
      );
      storeRatings.setModelOutput2(model2Arr);

      console.log("modelOutput in createCategory", modelOutput.data.data);
      console.log("modelOutput in model2Arr", model2Arr);
      setModelOutput(modelOutput.data.data);
      setModelOutputContext(modelOutput.data.data);
      stopLoading(loadingDispatch);
      dispatch({
        type: CREATE_CATEGORY,
        payload: result,
      });
      clearErrors(dispatch);
    } catch (err) {
      stopLoading(loadingDispatch);
      dispatch({
        type: CREATE_CATEGORY_ERROR,
        payload: err.response.data.message,
      });
    }
  };

export const clearErrors = (dispatch) => {
  dispatch({
    type: CLEAR_CREATE_CATEGORY_ERROR,
  });
};
