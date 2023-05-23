import {makeAutoObservable} from "mobx";

export default class UserZakaz{
    constructor() {
        this._isAuth = false
        this._user = {}
        this._wallet = {}
        this._users = []
        makeAutoObservable(this)
    }

    setIsAuth(bool){
        this._isAuth = bool
    }

    setUser(user) {
        this._user = user
    }

    get isAuth(){
        return this._isAuth
    }

    get user(){
        return this._user
    }
    get wallet(){
        return this._wallet
    }
    setWallet(wallet) {
        this._wallet = wallet
    }
    get users(){
        return this._users
    }
    setUsers(users) {
        this._users = users
    }
    getUsersWithId(id) {
        return this._users.find(item => item.id === parseInt(id));
    }
    setPhoto2(photo,id) {
        const user = this._users.find(item => item.id === parseInt(id));
        if (user) {
            user.photo = photo;
            this._users = [...this._users]; // Создание нового массива, чтобы обновить ссылку на объект
        }
    }
}