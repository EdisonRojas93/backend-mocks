import { logic } from "./sign.js";
import { generateToken } from "./login.js";

const ValidateComponent = (path, response) => {

  if (path == "api/v1/prueba") {
    return logic;
  }

  if (path == "api/v1/contact/register") {
    return generateToken(response);
  }

  return response;
};

const GenerateUrl = (path, req) =>{
  if (path == "api/v1/contact/register") {
    return path + '/' + req.body.product
  }

  return path
}

export {ValidateComponent, GenerateUrl};
