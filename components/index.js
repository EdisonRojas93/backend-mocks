import { logic } from "./sign.js";
import { generateToken } from "./login.js";
import { validateStep, saveStep, saveUploadState, validateUploadState} from './onboarding.js'

const ValidateComponent = (path, response) => {

  if (path == "api/v1/prueba") {
    return logic;
  }

  if (path == "api/v1/contact/register") {
    return generateToken(response);
  }

  if (path == "api/v1/contact/register") {
    return generateToken(response);
  }

  return response;
};

const GenerateUrl = async (path, req) =>{
  if (path == "api/v1/contact/register") {
    return path + '/' + req.body.product
  }
  if (path == "api/v1/onboarding/credit-request?item_per_page=100&page=1&order=ASC") {
    const resource = await validateStep(req.headers['authorization'].split(" ")[1])
    return path + resource
  }
  if (path == "api/v1/payment_plan") {
    return path + '/' + req.body.product_uuid
  }
  if (path.includes("api/v1/onboarding/update-amount")) {
    return "api/v1/onboarding/update-amount"
  }
  if (path.includes("/step/")) {
    await saveStep(req.headers['authorization'].split(" ")[1], path)
    return  
  }
  if (path.includes("api/v1/onboarding/credit-files")) {
    if(req.method == "POST"){
      await saveUploadState(req.headers['authorization'].split(" ")[1])
      return path
    }else if(req.method == "GET"){
      const resource = await validateUploadState(req.headers['authorization'].split(" ")[1])
      return path + resource
    }
  }
  return path
}

export {ValidateComponent, GenerateUrl};
