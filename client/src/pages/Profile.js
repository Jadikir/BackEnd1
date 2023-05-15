import React, {useContext, useState} from 'react';
import {Button, Col, Container, Form, Image, Modal, Row} from "react-bootstrap";
import OtzyvsList from "../components/OtzyvsList";
import {CHAT_ROUTE, REGISTRATION_ROUTE} from "../utils/consts";
import {Link, NavLink, useParams} from "react-router-dom";
import ava from '..//assets/ava.jpg';
import {createOtzyv} from "../http/OtzyvAPI";
import {Context} from "../index";

const Profile = () => {
    const [show, setShow] = useState(false);
    const {user} = useContext(Context)
    const [soderjanie, setSoderjanie] = useState('');
    const { id } = useParams();
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const click = async (Soderjanie, WhomId)=>{
        try{
            const data = await createOtzyv(Soderjanie, WhomId)
            window.location.reload()
            handleClose()
        }
        catch (e)
        {alert(e.response.data.message)  }
    }
    return (
        <Container className="mt-4">
            <Row>
                <Col >
                    <img width={300} height={300} src={ava} style={{borderRadius: "20%"}} />
                </Col>
                <Col>
                    <Row> <p>{user.getUsersWithId(id).email}</p></Row>
                    <Row> <p>{user.getUsersWithId(id).email}</p></Row>
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
                                <Form.Control as="textarea"
                                              value = {soderjanie}
                                              onChange={e=>setSoderjanie(e.target.value)} rows={3}
                                               />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            ГАЛЯ,ОТМЕНА
                        </Button>
                        <Button variant="primary" onClick={()=>click(soderjanie, id)}>
                            Отправить
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Col>

            </Row>
            <Row>
                <Col className="mt-2">
                    <OtzyvsList Id={id} />
                </Col>

            </Row>

        </Container>
    );
};

export default Profile;