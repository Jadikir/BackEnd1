import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import reportWebVitals from './reportWebVitals';
import UserZakaz from "./Zakaznai/UserZakaz";
import Zakaziki from "./Zakaznai/Zakaziki";

export const Context = createContext(null)

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <Context.Provider value={{
        user: new UserZakaz(),
        Zakaziki: new Zakaziki(),
    }}>
        <App />
    </Context.Provider>,
)


reportWebVitals();
