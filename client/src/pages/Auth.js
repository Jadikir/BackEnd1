import React, {useContext} from 'react';
import {Button, Card, Container, Form} from "react-bootstrap";
import {LOGIN_ROUTE, REGISTRATION_ROUTE} from "../utils/consts";
import {NavLink, useLocation} from "react-router-dom";
import {Context} from "../index";

const Auth = () => {
    const {user} = useContext(Context)
    const location = useLocation()
    const isLogin = location.pathname === LOGIN_ROUTE
    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{height:window.innerHeight - 54}}
        >
            <Card style={{width: 600}} className="p-5">
                <h2 className="m-auto">{isLogin ? 'Авторизация животного!' : 'Регистрация абортыша!'}</h2>
                <Form className="d-flex flex-column">
                    <Form.Control
                        className="mt-4"
                        placeholder="Ваш email, пожалуйста"
                    />
                    <Form.Control
                        className="mt-3"
                        placeholder="Ваш Parol', пожалуйста"
                    />
                    <Form className="d-flex justify-content-between mt-3 m">
                        {isLogin ?
                            <div>
                                Нет аккаунта? Чего ждем?? <NavLink to={REGISTRATION_ROUTE}> Регистрируемся!!! </NavLink>
                            </div>
                            :
                            <div>
                                Есть аккаунт? <NavLink to={LOGIN_ROUTE}> Войди в меня! </NavLink>
                            </div>
                        }
                        <Button
                            variant={"outline-danger"}
                            onClick={() => user.setIsAuth(true)}
                        >
                            {isLogin ? 'Вхади!' : 'Стать частью семьи'}
                        </Button>
                    </Form>
                </Form>
            </Card>
        </Container>
    );
};

export default Auth;