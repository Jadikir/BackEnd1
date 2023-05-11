import {makeAutoObservable} from "mobx";

export default class Otzyviki{
    constructor() {
        this._otzyvs = [
            {id: 1, description: "1"},
            {id: 2, description: "2"},
            {id: 3, description: "3"},
            {id: 4, description: "4"},
            {id: 5, description: "5"}
        ]
        makeAutoObservable(this)
    }

    set otzyvs(otzyvs){
        this._otzyvs = otzyvs
    }

    get otzyvs(){
        return this._otzyvs
    }


}