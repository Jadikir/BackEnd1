import {makeAutoObservable} from "mobx";

export default class Otzyviki{
    constructor() {
        this._otzyvs = [
            {id: 1, description: "Полная неральная мега пиздатая гигахуйянПолная неральная мега пиздатая гигахуйянПолная неральная мега пиздатая гигахуйянПолная неральная мега пиздатая гигахуйянПолная неральная мега пиздатая гигахуйянПолная неральная мега пиздатая гигахуйянПолная неральная мега пиздатая гигахуйян"},
            {id: 2, description: "ХУЙНЯ"},
            {id: 3, description: "ХУЙНЯ"},
            {id: 4, description: "ХУЙНЯ"},
            {id: 5, description: "ХУЙНЯ"}
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