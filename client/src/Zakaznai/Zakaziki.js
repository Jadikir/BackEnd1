import {makeAutoObservable} from "mobx";
import id from "react-timeago/lib/language-strings/id";

export default class Zakaziki{
    constructor() {
        this._zakazs = [
        ]
        makeAutoObservable(this)
    }

    set zakazs(zakazs){
        this._zakazs = zakazs
    }

    get zakazs(){
        return this._zakazs
    }
    getItemsWithParametr(id) {
        return this._zakazs.filter(item => item.UserId === id)
    }
    getItemsWithCum(id) {
        return this._zakazs.filter(item => item.WhomId === id)
    }
    getZakazWithId(id) {
        return this._zakazs.find(item => item.id === parseInt(id));
    }

}