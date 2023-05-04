import React, {useContext, useState} from 'react';
import {Accordion, Button,Modal} from "react-bootstrap";
import {useNavigate} from 'react-router-dom'
import { ZAKAZPAGE_ROUTE} from "../utils/consts";
import {Context} from "../index";
import Zakaziki from "../Zakaznai/Zakaziki";

const ZakazItem = ({Zakaziki}) => {
    const navigate = useNavigate()
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const {user} = useContext(Context)

    return (
        <Accordion>
            <Accordion.Item eventKey="0">
                <Accordion.Header>{Zakaziki.name}</Accordion.Header>
                <Accordion.Body className="d-flex align-items-center">
                    <div className="flex-grow-1">
                        Что-то на татарском
                    </div>
                    {(user.isAuth&&
                        <Button variant="danger" variant="outline-danger" onClick={handleShow}>
                            ВЫРЕЗАТЬ ТВАРЬ
                        </Button>)}
                        <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Modal heading</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>Этот заказ точно нарушает политику капибар?</Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>
                                    НЕт, миссклик
                                </Button>
                                <Button variant="primary" onClick={handleClose}>
                                    Да,вырезать
                                </Button>
                            </Modal.Footer>
                        </Modal>
                        <Button className="my-2" variant="info" as="input" type="button" value="Нажми если интересно" onClick={() => navigate(ZAKAZPAGE_ROUTE + '/' + Zakaziki.id)}/>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    );
};

export default ZakazItem;