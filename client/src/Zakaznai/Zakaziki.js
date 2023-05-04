import {makeAutoObservable} from "mobx";

export default class Zakaziki{
    constructor() {
        this._zakazs = [
            {id: 1, name: "3D модель пивной бутылки", price: 3000},
            {id: 2, name: "Самолетик", price: 5000},
            {id: 3, name: "Гитара на миллиард полигонов", price: 10000},
            {id: 4, name: "Пончик", price: 300},
            {id: 5, name: "Пончик", price: 300},
        ]
        makeAutoObservable(this)
    }

    set zakazs(zakazs){
        this._zakazs = zakazs
    }

    get zakazs(){
        return this._zakazs
    }


}