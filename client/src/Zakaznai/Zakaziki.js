import {makeAutoObservable} from "mobx";

export default class Zakaziki{
    constructor() {
        this._zakaz = [
            {id: 1, name: "3D модель пивной бутылки", price: 3000},
            {id: 2, name: "Самолетик", price: 5000},
            {id: 3, name: "Гитара на миллиард полигонов", price: 10000},
            {id: 4, name: "Пончик", price: 300},
        ]
        makeAutoObservable(this)
    }

    setZakaz(zakaz){
        this._zakaz = zakaz
    }

    get Zakaz(){
        return this._zakaz
    }

}