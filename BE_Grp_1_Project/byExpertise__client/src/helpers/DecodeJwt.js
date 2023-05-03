import jwt_decode from "jwt-decode";

const getUser = () => {
  const token = localStorage.getItem("token");
  const result = jwt_decode(token);
  // console.log("result in DecodeJwt", result);
  return result;
};

export default getUser;
