import {$authHost,$host} from "./index";

import jwt_decode from "jwt-decode"

export const createOtzyv = async (Soderjanie, WhomId) => {
    const {data} = await $authHost.post('api/otzyv', {Soderjanie, WhomId})
    return data
}
export const getOtzyvs= async () => {
    const {data} = await $host.get('api/otzyv')
    return (data)
}

