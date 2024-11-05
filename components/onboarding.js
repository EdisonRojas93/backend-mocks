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

export {validateStep, saveStep}