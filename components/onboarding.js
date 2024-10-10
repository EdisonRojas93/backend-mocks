import { getSessionInfo } from './temporal.js'

const validateStep = async (token) => {
    const sessionInfo = await getSessionInfo(token)
    const product = sessionInfo.product_uuid
    const step = sessionInfo?.step

    let newPath = step ? `/${product}/${step}` : `/${product}`
    return newPath
}

export {validateStep}