import React, {useContext, useState} from 'react';
import {Container, Row, Col, Button, Modal, OverlayTrigger, Tooltip} from 'react-bootstrap';
import {Context} from "../index";
import {useParams} from "react-router-dom";


const States = Object.freeze({
    0: "Заказ можно взять, поспеши",
    1: "Заказ выполняется",
    2: "Заказ сделан"
})
const States2 = Object.freeze({
    0: "warning",
    1: "info",
    2: "success"
})

const ZakazPage = () => {
    const{Zakaziki} = useContext(Context)
    const { id } = useParams();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const {user} = useContext(Context)
    return (
        <Container>
            <Row>
                <Col className="mt-4">
                    <h1 style={{ fontSize: "30px" }}>{Zakaziki.zakazs[id - 1].name}</h1>
                    <p style={{ marginTop: "10px", marginBottom: "10px" }}>
                        Автор: Автор+{id}
                    </p>
                </Col>
                <Col xs={3} className="mt-4">
                    <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Здесь отображается статус заказа</Tooltip>}>
      <span className="d-inline-block">
        <Button  variant={States2[Zakaziki.zakazs[id - 1].status].toString()} disabled style={{ pointerEvents: 'none' }}>
          {States[Zakaziki.zakazs[id - 1].status].toString()}
        </Button>
      </span>
                    </OverlayTrigger>
                </Col>
                <Col xs={3} className="mt-4">
                    <p>Стоимость заказа: {Zakaziki.zakazs[id - 1].price} руб.</p>
                </Col>
            </Row>
            <Row>
                <Col>
                    <p>Текст о заказе</p>
                </Col>
                <Col xs={3} className="mt-4">
                    {user.isAuth&&!Zakaziki.zakazs[id - 1].status&&<Button variant="danger" variant="outline-danger" onClick={handleShow}>
                        Взять заказ
                    </Button>}
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Подтверждение</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>Вы уверены,что хотите выполнить заказ "{Zakaziki.zakazs[id - 1].name}" за "{Zakaziki.zakazs[id - 1].price}"</Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                НЕт, миссклик
                            </Button>
                            <Button variant="primary" onClick={handleClose}>
                                Да,готов
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </Col>
            </Row>
            <Row>
                <Col>
                    <p>Еще какой-то текст, расположенный ниже</p>
                </Col>
            </Row>
        </Container>
    );
};


export default ZakazPage;