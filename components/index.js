import { logic } from "./sign.js";
import { generateToken } from "./login.js";
import { validateStep, saveStep, saveUploadState, validateUploadState, saveSignStep, validateSignStep} from './onboarding.js'

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
    return "api/v1/onboarding/credit-request/step"  
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
  if (path.includes("api/v1/onboarding/documents")) {
    const resource = await validateSignStep(req.headers['authorization'].split(" ")[1])
    return path + resource
  }
  if (path.includes("api/v1/onboarding/next_steps")) {
      const resource = await validateSignStep(req.headers['authorization'].split(" ")[1])
      if(!resource){
        const step = "validation_email"
        await saveSignStep(req.headers['authorization'].split(" ")[1], step)
        return path
      }else{
        return path + resource
      }
    }
  //   if(("step" in req.body)){
  //     const resource = await validateSignStep(req.headers['authorization'].split(" ")[1])
  //     if(resource){

  //     }
  //     const step = "validation_email"
  //     await saveSignStep(req.headers['authorization'].split(" ")[1], step)
  //     return path + "/" + step
  //   } 
  //   if(req.body.step === null){
  //     return path
  //   }else{
  //     return path + "/" + req.body.step
  //   }
  // }
  return path
}

export {ValidateComponent, GenerateUrl};
