import {makeAutoObservable} from "mobx";

export default class Zakaziki{
    constructor() {
        this._zakazs = [
            {id: 1, name: "3D модель пивной бутылки", price: 3000,status:0,parametr:1},
            {id: 2, name: "Самолетик", price: 5000,status:1,parametr:0},
            {id: 3, name: "Гитара на миллиард полигонов", price: 10000,status:2,parametr:1},
            {id: 4, name: "Пончик", price: 300,status:1,parametr:0},
            {id: 5, name: "Пончик", price: 300,status:0,parametr:0},
        ]
        makeAutoObservable(this)
    }

    set zakazs(zakazs){
        this._zakazs = zakazs
    }

    get zakazs(){
        return this._zakazs
    }
    getItemsWithParametr() {
        return this._zakazs.filter(item => item.parametr === 1)
    }

}