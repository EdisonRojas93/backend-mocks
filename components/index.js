import { logic } from "./sign.js";

const valildateLogicAditional = (path, response) => {
  console.log("entro", path, response);

  if (path == "api/v1/prueba") {
    return logic;
  }

  return response;
};

export default valildateLogicAditional;
