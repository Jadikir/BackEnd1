import React, {useContext} from 'react';
import {Context} from "../index";
import {Button, Container, Nav, Navbar} from "react-bootstrap";
import {HOMEPAGE_ROUTE, LOGIN_ROUTE} from "../utils/consts";
import {observer} from "mobx-react-lite";
import {NavLink} from "react-router-dom";

const NavBar = observer(() => {
    const {user} = useContext(Context)
    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <NavLink style={{color:'white'}} to={HOMEPAGE_ROUTE}>3D Hydrant</NavLink>
                {user.isAuth ?
                    <Nav className="ml-auto" style={{color: 'white'}}>
                        <Button variant={"outline-info"}>Админ Гэй</Button>
                        <Button variant={"outline-info"} className="ms-2" onClick={() => user.setIsAuth(false)}>Покинуть Капибарию</Button>
                    </Nav>
                    :
                    <Nav className="ml-auto" style={{color: 'white'}}>
                        <Button variant={"outline-info"} >
                            <NavLink to={LOGIN_ROUTE}>Авторизейшн</NavLink>
                        </Button>
                    </Nav>
                }

            </Container>
        </Navbar>
    );
});

export default NavBar;