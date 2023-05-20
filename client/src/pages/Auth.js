import React, {useContext, useState} from 'react';
import {Button, Card, Container, Form} from "react-bootstrap";
import {HOMEPAGE_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE} from "../utils/consts";
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import {Context} from "../index";
import {login, registration} from "../http/userAPI";
import {observer} from "mobx-react-lite";
import {getWalletMoney} from "../http/walletApi";
const Auth = observer(() => {
    const {user} = useContext(Context)
    const location = useLocation()
    const navigation = useNavigate()
    const isLogin = location.pathname === LOGIN_ROUTE
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [name,setName] = useState('')
    const [AuthOrLog, setAuthOrLog] = useState(false);

    const handleClick = (navigation) => {
        setAuthOrLog(true);
        navigation(REGISTRATION_ROUTE);
    };
    const handleClick2 = (navigation) => {
        setAuthOrLog(false);
        navigation(LOGIN_ROUTE);
    };
    const click = async ()=>{

        try{let data;
            if(isLogin)
            {
                data = await login(email,password)
            }
            else
            { if (!name){data = await registration(email,password,"Anonymous")}
                else data = await registration(email,password,name)
            }
            user.setUser(data)
            user.setIsAuth(true)
            user.setWallet(getWalletMoney())
        navigation(HOMEPAGE_ROUTE)}
        catch (e)
        {alert(e.response.data.message)  }

    }

    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{height:window.innerHeight - 54}}
        >
            <Card style={{width: 600}} className="p-5">
                <h2 className="m-auto">{isLogin ? 'Авторизация животного!' : 'Регистрация животного!'}</h2>
                <Form className="d-flex flex-column">
                    <Form.Control
                        className="mt-4"
                        placeholder="Ваш email, пожалуйста"
                        value = {email}
                        onChange={e=>setEmail(e.target.value)}
                    />
                    {((AuthOrLog)&&<Form.Control
                        className="mt-4"
                        placeholder="Вашe имя, пожалуйста"
                        value={name}
                        onChange={e=>setName(e.target.value)}
                    />)}
                    <Form.Control
                        className="mt-3"
                        placeholder="Ваш Parol', пожалуйста"
                        value = {password}
                        onChange={e=>setPassword(e.target.value)}
                        type="password"
                    />
                    <Form className="d-flex justify-content-between mt-3 m">
                        {isLogin ?
                            <div>
                                Нет аккаунта? Чего ждем?? <NavLink to={REGISTRATION_ROUTE} onClick ={()=>handleClick(navigation)}> Регистрируемся!!! </NavLink>
                            </div>
                            :
                            <div>
                                Есть аккаунт? <NavLink to={LOGIN_ROUTE} onClick ={()=>handleClick2(navigation)}> Войди в меня! </NavLink>
                            </div>
                        }
                        <Button
                            variant={"outline-danger"}
                            onClick={click}
                        >
                            {isLogin ? 'Вхади!' : 'Стать частью семьи'}
                        </Button>
                    </Form>
                </Form>
            </Card>
        </Container>
    );
});

export default Auth;