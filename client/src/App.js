import logo from './logo.svg';
import React, {useContext, useEffect, useState} from 'react';
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import {observer} from "mobx-react-lite";
import {check} from "./http/userAPI";
import {Context} from "./index";
import {Spinner} from "react-bootstrap";
import {getZakazs} from "./http/ZakazAPI";

const App = observer(() => {
    const {user} = useContext(Context)
    const {Zakaziki} = useContext(Context)
    const[loading,setLoading]=useState(true)
    const authToken = localStorage.getItem('token');
    console.log(authToken)
    useEffect(()=>{
        setTimeout(() => {
            try {
                check(authToken)
                    .then(data => {
                        if (data) {
                            user.setUser(data);
                            user.setIsAuth(true);
                        } else {
                            console.error('Данные пользователя не получены');
                        }
                    })
                getZakazs().then(data => {
                    Zakaziki.zakazs = data.rows;
                })
                    .finally(() => setLoading(false))
            } catch (e) {
                console.error('Ошибка при вызове функции check:', e);
            }
        }, 1000);
    }, []);
    if (loading){
        return <Spinner animation ={"grow"}></Spinner>
    }

  return (
      <BrowserRouter>
          <NavBar />
          <AppRouter />
      </BrowserRouter>
  )
})

export default App;
