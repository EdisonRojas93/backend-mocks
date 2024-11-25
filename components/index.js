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
  if (path.includes("api/v1/onboarding/next_step")) {
    const [resource, step] = await validateSignStep(req.headers['authorization'].split(" ")[1])
    console.log('step',step);
    
    switch (step) {
      case "view_document":
        await saveSignStep(req.headers['authorization'].split(" ")[1], "validation_email")
        return resource ? path + "/" + resource : path;
      case "validation_email":
        await saveSignStep(req.headers['authorization'].split(" ")[1], "validation_email")
        return resource ? path + "/" + resource : path;
      case "validation_email_success":
        await saveSignStep(req.headers['authorization'].split(" ")[1], "validation_sms")
        return path + "/validation_sms";
      case "validation_sms_success":
        await saveSignStep(req.headers['authorization'].split(" ")[1], "notify_event_bridge")
        return path + "/notify_event_bridge";
      default:
        await saveSignStep(req.headers['authorization'].split(" ")[1], step == undefined ? "view_document" : step)
        return resource ? path + "/" + resource : path;
    }
  }
  if(path.includes("api/v1/onboarding/documents")){
    console.log('aiuda');
    
    const [resource, step] = await validateSignStep(req.headers['authorization'].split(" ")[1])
    console.log('aaaa', resource);
    
    return resource ? path + "/" + resource : path;
  }
  if(path.includes("api/v1/onboarding/token/validate")){
    
    const [resource, step] = await validateSignStep(req.headers['authorization'].split(" ")[1])
    if (step == "validation_email"){
      await saveSignStep(req.headers['authorization'].split(" ")[1], "validation_email_success")
    }
    if (step == "validation_sms"){
      console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa :(');
      
      await saveSignStep(req.headers['authorization'].split(" ")[1], "validation_sms_success")
    }
  }
  return path
}

export {ValidateComponent, GenerateUrl};
