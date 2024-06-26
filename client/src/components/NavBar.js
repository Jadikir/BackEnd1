import React, {useContext, useEffect} from 'react';
import {Context} from "../index";
import {Button, Container, Image, Nav, Navbar, OverlayTrigger, Tooltip} from "react-bootstrap";
import {HOMEPAGE_ROUTE, LOGIN_ROUTE, PROFILE_ROUTE} from "../utils/consts";
import {observer} from "mobx-react-lite";
import {NavLink, useNavigate} from "react-router-dom";
import logo from '..//assets/logo.png';
import * as PropTypes from "prop-types";
import '..//styles.css';
import sushka from '..//assets/sushka.jpg';
import {getWalletMoney} from "../http/walletApi";

const States = Object.freeze({
    0:"Пользователь",
    1:"Админ"
})
const States2 = Object.freeze({
    0: "success",
    1: "warning"
})


function Raw(props) {
    return null;
}

Raw.propTypes = {children: PropTypes.node};
const NavBar = observer(() => {
    const navigate = useNavigate()
        const logOut = ()=>{
            localStorage.removeItem('token');
            user.setUser({})
            user.setIsAuth(false)
            navigate(HOMEPAGE_ROUTE)
            window.location.reload()
    }

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
                {(user.isAuth&&user.wallet) ?
                    <Nav className="ml-auto" style={{color: 'white'}}>
                        <OverlayTrigger
                            placement="bottom"
                            overlay={<Tooltip id="button-tooltip-2">Это ваши деньги</Tooltip>}
                        >
                            {({ ref, ...triggerHandler }) => (
                                <Button
                                    variant="light"
                                    {...triggerHandler}
                                    className="d-inline-flex align-items-center gradient-text"
                                >
                                    <Image
                                        ref={ref}
                                        roundedCircle
                                        src={sushka}
                                        height="30"
                                    />
                                    <span className="ms-1">У вас {user.wallet.Sushki} сушек</span>
                                </Button>
                            )}
                        </OverlayTrigger>
                        <Button  variant={"info"} className="ms-2" >
                            <NavLink to={PROFILE_ROUTE+'/'+user.user.id}>Мой профиль</NavLink>
                        </Button>
                        <Button  variant={States2[user.user.role].toString()} className="ms-2" disabled style={{ pointerEvents: 'none' }}>
                        {States[user.user.role].toString()}
                            </Button>
                        <Button variant={"outline-info"} className="ms-2" onClick={() => logOut()}>Покинуть Капибарию</Button>
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