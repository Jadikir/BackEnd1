import {$authHost,$host} from "./index";

import jwt_decode from "jwt-decode"

export const registration = async (email,password,name) => {
const {data} = await $host.post('api/user/registration',{email,password,name,role: '0'})
    localStorage.setItem('token',data.token)
    return jwt_decode(data.token)
 }
export const login = async (email,password) => {
    const {data} = await $host.post('api/user/login',{email,password})
    localStorage.setItem('token',data.token)
    return jwt_decode(data.token)
}
export const getAllUsers = async () => {
    const {data} = await $host.get('api/user')
    return data
}
export const check = async () => {
    try {
        const {data} = await $authHost.get('api/user/auth')
        localStorage.setItem('token', data.token)
        return jwt_decode(data.token)
    } catch (error) {
        if (error.response && error.response.status === 401) {
            // Обработка ошибки 401 здесь
            console.error('Ошибка авторизации', error)
            return null
        } else {
            // Обработка других ошибок здесь
            console.error('Произошла ошибка', error)
            return null
        }
    }
}
export const ChangePhoto = async (Id, photo) => {
    const formData = new FormData();
    formData.append('Id', Id);
    formData.append('photo', photo);

    const config = {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    };

    const { data } = await $authHost.post('api/user/photo', formData, config);
    return data;

};
