import {$authHost,$host} from "./index";

import jwt_decode from "jwt-decode"

export const getWalletMoney = async () => {
    const {data} = await $authHost.get(`api/user/wallet`)
    return data
}
export const updateMoneybyId= async (id,summa) => {
    const {data} = await $authHost.post(`api/user/wallet${id}/popolnenie`,{summa})
    return (data)
}
export const MakeTrasaction= async (id,summa,WhomId) => {
    const {data} = await $authHost.post(`api/user/wallet${id}/transaction`,{summa,WhomId})
    return (data)
}

