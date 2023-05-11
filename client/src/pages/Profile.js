import React, {useState} from 'react';
import {Button, Col, Container, Form, Image, Modal, Row} from "react-bootstrap";
import OtzyvsList from "../components/OtzyvsList";
import {CHAT_ROUTE, REGISTRATION_ROUTE} from "../utils/consts";
import {Link, NavLink} from "react-router-dom";
import ava from '..//assets/ava.jpg';
const Profile = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <Container className="mt-4">
            <Row>
                <Col >
                    <img width={300} height={300} src={ava} style={{borderRadius: "20%"}} />
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
            <Row> <Col className="mt-4 ms-5">
                <Button variant="primary"onClick={handleShow} >
                    Оставить отзыв
                </Button>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Комментарий</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group
                                className="mb-3"
                                controlId="exampleForm.ControlTextarea1"
                            >
                                <Form.Label>Напишите комметарий</Form.Label>
                                <Form.Control as="textarea" rows={3} />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            ГАЛЯ,ОТМЕНА
                        </Button>
                        <Button variant="primary" onClick={handleClose}>
                            Отправить
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Col>

            </Row>
            <Row>
                <Col className="mt-2">
                    <OtzyvsList></OtzyvsList>
                </Col>

            </Row>

        </Container>
    );
};

export default Profile;