import React from 'react';
import { Room } from '../components/Room/Room'
import { USER_KEY } from '../utils/consts'
import storage from '../utils/storage'

const Chat = () => {
    const user = storage.get(USER_KEY)
    console.log(user)
    return <Room />
};

export default Chat;