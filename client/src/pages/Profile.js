import React, {useContext, useState} from 'react';
import {Button, Col, Container, Form, Image, Modal, Row} from "react-bootstrap";
import OtzyvsList from "../components/OtzyvsList";
import {CHAT_ROUTE, REGISTRATION_ROUTE} from "../utils/consts";
import {Link, NavLink, useParams} from "react-router-dom";
import ava from '..//assets/ava.jpg';
import {createOtzyv} from "../http/OtzyvAPI";
import {Context} from "../index";
import {updateMoneybyId} from "../http/walletApi";

const Profile = () => {
    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);
    const {user} = useContext(Context)
    const [soderjanie, setSoderjanie] = useState('');
    const [summa, setSumma] = useState('');
    const { id } = useParams();
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);
    const handleClick = async (id,summa)=>{
        const data = updateMoneybyId(id,summa)
        handleClose2()
        window.location.reload()
    }
    const click = async (Soderjanie, WhomId)=>{
        try{
            const data = await createOtzyv(Soderjanie, WhomId)
            window.location.reload()
            handleClose()
        }
        catch (e)
        {alert(e.response.data.message)  }
    }
    const handleSummaChange = (e) => {
        const value = e.target.value;
        setSumma(value);
        setIsButtonDisabled(value === '' || value < 0);
    };
    return (
        <Container className="mt-4">
            <Row>
                <Col >
                    <img width={300} height={300} src={ava} style={{borderRadius: "20%"}} />
                </Col>
                <Col>
                    <Row> <p>{user.getUsersWithId(id).name}</p></Row>
                    <Row> <p>{user.getUsersWithId(id).email}</p></Row>
                    <Button variant={"outline-dark"} style={{ display: "block" } }>
                        <Link to={CHAT_ROUTE}>Мои сообщения!!!</Link>
                    </Button>
                    <Button variant={"outline-dark"} className="mt-2" onClick={handleShow2} style={{ display: "block" }}>
                     Полнить счет сушками</Button>
                    <Modal show={show2} onHide={handleClose2}>
                        <Modal.Header closeButton>
                            <Modal.Title>Пополнение</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                <Form.Group
                                    className="mb-3"
                                    controlId="exampleForm.ControlTextarea1"
                                >
                                    <Form.Label>Насколько вы хотите пополнить счет?</Form.Label>
                                    <Form.Control
                                        type="number"
                                        min={1}
                                        value={summa}
                                        onChange={handleSummaChange}
                                        onKeyPress={e => {
                                            if (e.target.value < 1) {
                                                e.preventDefault();
                                            }
                                        }}
                                    />
                                </Form.Group>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose2}>
                                ГАЛЯ,ОТМЕНА
                            </Button>
                            <Button variant="primary" onClick={() => handleClick(id, summa)} disabled={isButtonDisabled}>
                                Пополнить
                            </Button>
                        </Modal.Footer>
                    </Modal>
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