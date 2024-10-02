import { logic } from "./sign.js";

const ValidateComponent = (path, response) => {
  console.log("entro", path, response);

  if (path == "api/v1/prueba") {
    return logic;
  }

  return response;
};

export default ValidateComponent;
