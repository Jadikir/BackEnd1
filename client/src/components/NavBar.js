import React, {useContext} from 'react';
import {Context} from "../index";
import {Button, Container, Nav, Navbar} from "react-bootstrap";
import {HOMEPAGE_ROUTE, LOGIN_ROUTE, PROFILE_ROUTE} from "../utils/consts";
import {observer} from "mobx-react-lite";
import {NavLink, useNavigate} from "react-router-dom";
import logo from 'E:/programs/NESonderPapka/BackEnd1/client/src/assets/logo.png';
import * as PropTypes from "prop-types";
import 'E:/programs/NESonderPapka/BackEnd1/client/src/styles.css';

const States = Object.freeze({
    0: "Админ",
    1: "Пользователь"
})
const States2 = Object.freeze({
    0: "warning",
    1: "success"
})
const handleButtonClick = (user) => {
    user.setIsAuth(false)
    window.location.reload()
};

function Raw(props) {
    return null;
}

Raw.propTypes = {children: PropTypes.node};
const NavBar = observer(() => {
    const navigate = useNavigate()
    const {user} = useContext(Context)
    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <NavLink style={{display: 'flex', alignItems: 'center', color: 'white', textDecoration: 'none'}} to={HOMEPAGE_ROUTE}>
                    <img src={logo} alt="3D Hydrant Logo" height="40" className="d-inline-block align-top mx-2" style={{borderRadius: "50%"}} />
                    <span className="navbar-text" style={{ fontSize: "20px" }}>
                        3D Hydrant
                        </span>
                </NavLink>
                {user.isAuth ?
                    <Nav className="ml-auto" style={{color: 'white'}}>
                        <Button  variant={"info"} className="ms-2" >
                            <NavLink to={PROFILE_ROUTE}>Мой профиль</NavLink>
                        </Button>
                        <Button  variant={States2[0].toString()} className="ms-2" disabled style={{ pointerEvents: 'none' }}>
                        {States[0].toString()}
                            </Button>
                        <Button variant={"outline-info"} className="ms-2" onClick={() => handleButtonClick(user)}>Покинуть Капибарию</Button>
                    </Nav>
                    :
                    <Nav className="ml-auto gradient-text" style={{color: 'white'}}>
                        <Button variant={"outline-info"} >
                            <NavLink style ={{textDecoration: 'none',color: 'black'}} to={LOGIN_ROUTE}>Авторизейшн</NavLink>
                        </Button>
                    </Nav>
                }
            </Container>
        </Navbar>
    );
});

export default NavBar;