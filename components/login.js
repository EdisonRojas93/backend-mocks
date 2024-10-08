import { v4 as uuidv4 } from 'uuid';
import {createTTLIndex} from './temporal.js'


const generateToken = (response) => {
    let uuid = uuidv4();
    createTTLIndex({
        "token": uuid,
        "product_uuid": response.response.credit_request.product_uuid
    })
    return {
        ...response,
        "response": {
            ...response.response,
            "access_token": uuid,
        }
    }
}

export {generateToken};