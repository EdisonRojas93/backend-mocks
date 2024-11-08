import { getSessionInfo, updateData } from './temporal.js'

const validateStep = async (token) => {
    const sessionInfo = await getSessionInfo(token)
    const product = sessionInfo.product_uuid
    const step = sessionInfo?.step
    
    let newPath = step ? `/${product}/${step}` : `/${product}`
    return newPath
}

const saveStep = async (token, path) => {
    const aux = path.split("/")
    const step = aux[aux.length - 1]
    await updateData(token, {"step": step})
}

const saveUploadState = async (token) => {
    await updateData(token, {"upload_document": true})
}

const validateUploadState = async (token) => {
    const sessionInfo = await getSessionInfo(token)
    const state = sessionInfo?.upload_document
    
    let newPath = state ? `/${state}` : ``
    return newPath
}

const saveSignStep = async (token, step) => {
    await updateData(token, {"sign_step": step})
}

const validateSignStep = async (token) => {
    const sessionInfo = await getSessionInfo(token)
    const step = sessionInfo?.sign_step
    
    let newPath = step ? `/${step}` : ``
    return newPath
}


export {validateStep, saveStep, saveUploadState, validateUploadState, saveSignStep, validateSignStep}