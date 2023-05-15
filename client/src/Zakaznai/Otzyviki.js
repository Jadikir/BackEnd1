import {makeAutoObservable} from "mobx";

export default class Otzyviki{
    constructor() {
        this._otzyvs = [
        ]
        makeAutoObservable(this)
    }

    set otzyvs(otzyvs){
        this._otzyvs = otzyvs
    }

    get otzyvs(){
        return this._otzyvs
    }
    getUserotzyvs(id){
        const otzyv = this._otzyvs.find(item => item.WhomId === parseInt(id));
        return otzyv ? [otzyv] : [];
    }

}