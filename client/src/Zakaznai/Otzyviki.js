import {makeAutoObservable} from "mobx";

export default class Otzyviki{
    constructor() {
        this._otzyvs = [
        ]
        makeAutoObservable(this)
    }

    setOtzyvs(otzyvs) {
        this._otzyvs = otzyvs;
    }

    get otzyvs(){
        return this._otzyvs
    }
    getUserotzyvs(id) {
        const otzyvs = this._otzyvs.filter(item => item.WhomId === parseInt(id));
        return otzyvs;
    }

}