import {makeAutoObservable} from "mobx";

export default class Chatiks{
    constructor() {
        this._chats = [
            {id: 1},
            {id: 2},
            {id: 3},
            {id: 4},
            {id: 5}
        ]
        makeAutoObservable(this)
    }

    set chats(chats){
        this._chats = chats
    }

    get chats(){
        return this._chats
    }


}