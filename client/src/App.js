import logo from './logo.svg';
import React, {useContext, useEffect, useState} from 'react';
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import {observer} from "mobx-react-lite";
import {check, getAllUsers} from "./http/userAPI";
import {Context} from "./index";
import {Spinner} from "react-bootstrap";
import {getZakazs} from "./http/ZakazAPI";
import {getOtzyvs} from "./http/OtzyvAPI";
import {getWalletMoney} from "./http/walletApi";


const App = observer(() => {
    const {user} = useContext(Context)
    const {Zakaziki} = useContext(Context)
    const {Otzyviki} = useContext(Context)
    const[loading,setLoading]=useState(true)
    const authToken = localStorage.getItem('token');
    useEffect(() => {
        setTimeout(() => {
            try {
                check(authToken)
                    .then(data => {
                        if (data) {
                            user.setUser(data);
                            user.setIsAuth(true);
                            getWalletMoney().then(walletData => {
                                user.setWallet(walletData);
                            });
                        } else {
                            console.error('Данные пользователя не получены');
                        }
                    })
                    .then(() => {
                        getZakazs().then(data => {
                            Zakaziki.zakazs = data.rows;
                        });
                        getAllUsers().then(data => {
                            user.setUsers(data);
                        });
                        getOtzyvs().then(data => {
                            Otzyviki.otzyvs = data.rows;
                        });
                    })
                    .finally(() => setLoading(false));
            } catch (e) {
                console.error('Ошибка при вызове функции check:', e);
            }
        }, 1000);
    }, [user, Zakaziki, Otzyviki, user.wallet, user.setWallet]); // Добавлено user.setWallet в зависимости
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
