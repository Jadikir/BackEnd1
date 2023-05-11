import React from 'react';
import {Button, Col, Container, Image, Row} from "react-bootstrap";
import OtzyvsList from "../components/OtzyvsList";
import {CHAT_ROUTE, REGISTRATION_ROUTE} from "../utils/consts";
import {Link, NavLink} from "react-router-dom";

const Profile = () => {
    return (
        <Container className="mt-4">
            <Row>
                <Col >
                    <Image width={300} height={300} src="https://mobimg.b-cdn.net/v3/fetch/6d/6d41b9f69e472c3b671d2b856782fc17.jpeg" />
                </Col>
                <Col>
                    <Row> <p>Имя пользователя</p></Row>
                    <Row> <p>Почта</p></Row>
                    <Button variant={"outline-dark"} style={{ display: "block" } }>
                        <Link to={CHAT_ROUTE}>Мои сообщения!!!</Link>
                    </Button>
                    <Button variant={"outline-dark"} className="mt-2" style={{ display: "block" }}>
                        <Link to="https://youtu.be/dQw4w9WgXcQ">Пополнить кошелек</Link>
                    </Button>
                </Col>
            </Row>
            <Row>
                <Col className="mt-4">
                    <OtzyvsList></OtzyvsList>
                </Col>

            </Row>

        </Container>
    );
};

export default Profile;