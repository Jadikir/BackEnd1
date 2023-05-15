import {$authHost,$host} from "./index";

import jwt_decode from "jwt-decode"

export const createZakaz= async (name,price,description) => {
    const {data} = await $authHost.post('api/zakaz',{name,price,description})
    return (data)
}
export const getZakazs= async () => {
    const {data} = await $host.get('api/zakaz')
    return (data)
}
export const deleteZakaz = async (id) => {
    const { data } = await $authHost.delete(`api/zakaz/${id}`);
    return data;
}
export const updateZakaz = async (id, status) => {
        const { data } = await $authHost.post(`api/zakaz/${id}/update`, { status });
        return data;
    }
;
