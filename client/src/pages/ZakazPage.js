import React, {useContext, useEffect, useState} from 'react';
import {Container, Row, Col, Button, Modal, OverlayTrigger, Tooltip, Toast} from 'react-bootstrap';
import {Context} from "../index";
import {NavLink, useParams} from "react-router-dom";
import {login, registration} from "../http/userAPI";
import {HOMEPAGE_ROUTE, PROFILE_ROUTE} from "../utils/consts";
import {updateWhomZakaz, updateZakaz} from "../http/ZakazAPI";
import {MakeTrasaction} from "../http/walletApi";


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
    const [show2, setShow2] = useState(false);
    const [show3, setShow3] = useState(false);
    const handleClose = () =>setShow(false);
    const handleClose3 = () =>setShow3(false);
    const Otkrit = async (id,status,summa,WhomId) => {
        click(id, status)
        const data = await MakeTrasaction(id,summa,WhomId)
        handleClose3()
        setShow2(true)
        window.location.reload()
    }
    const click = async (id,status,WhomId)=>{
        try{
            const data = await updateZakaz(id,status)
            const data2 = await updateWhomZakaz(id,WhomId)
            window.location.reload()
            handleClose()
        }
        catch (e)
        {alert(e.response.data.message)  }
    }
    const handleShow = () => setShow(true);
    const handleShow3 = () => setShow3(true);
    const {user} = useContext(Context)
    const [timeElapsed, setTimeElapsed] = useState(1); // Начальное значение - 1 минута

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeElapsed(prevTime => prevTime + 1);
        }, 60000); // Обновляем время каждую минуту
        return () => clearInterval(interval); // Остановка интервала при удалении компонента
    }, []);

    return (
        <Container>
            <Row>

                <Col className="mt-4">
                    <h1 style={{ fontSize: "30px" }}>{Zakaziki.getZakazWithId(id).name} </h1>
                    <NavLink to={PROFILE_ROUTE + "/"+ user.getUsersWithId(Zakaziki.getZakazWithId(id).UserId).id }><p style={{ marginTop: "10px", marginBottom: "10px" }}>
                        Автор: {user.getUsersWithId(Zakaziki.getZakazWithId(id).UserId).name}
                    </p></NavLink>
                </Col>
                <Col xs={3} className="mt-4">
                    <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Здесь отображается статус заказа</Tooltip>}>
      <span className="d-inline-block">
        <Button  variant={States2[Zakaziki.getZakazWithId(id).Status].toString()} disabled style={{ pointerEvents: 'none' }}>
          {States[Zakaziki.getZakazWithId(id).Status].toString()}
        </Button>
      </span>
                    </OverlayTrigger>
                </Col>
                <Col xs={3} className="mt-4">
                    <p>Стоимость заказа: {Zakaziki.getZakazWithId(id).price} сушек</p>
                </Col>
            </Row>
            <Row>
                <Col>
                    <p>{Zakaziki.getZakazWithId(id).description}</p>
                </Col>
                <Col xs={3} className="mt-4">
                    {!(user.user.id===Zakaziki.getZakazWithId(id).UserId)&&user.isAuth&&Zakaziki.getZakazWithId(id).Status==0&&<Button variant="danger" variant="outline-danger" onClick={handleShow}>
                        Взять заказ
                    </Button>}
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Подтверждение</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>Вы уверены,что хотите выполнить заказ "{Zakaziki.getZakazWithId(id).name}" за "{Zakaziki.getZakazWithId(id).price}"</Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                НЕт, миссклик
                            </Button>
                            <Button variant="primary" onClick={()=>click(id,1,user.user.id)}>
                                Да,готов
                            </Button>
                        </Modal.Footer>
                    </Modal>
                    {(user.user.id===Zakaziki.getZakazWithId(id).WhomId)&&user.isAuth && Zakaziki.getZakazWithId(id).Status == 1 && <Button variant="danger" variant="outline-danger" onClick={handleShow3}>
                        Сдать заказ
                    </Button>}
                    <Modal show={show3} onHide={handleClose3}>
                        <Modal.Header closeButton>
                            <Modal.Title>Подтверждение</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>Вы уверены,что хотите сдать заказ "{Zakaziki.getZakazWithId(id).name}" и гарантируете, что он выполнен</Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose3}>
                                НЕт, миссклик
                            </Button>
                            <Button variant="primary" onClick={()=>Otkrit(id,2,parseInt(Zakaziki.getZakazWithId(id).price),user.getUsersWithId(Zakaziki.getZakazWithId(id).UserId).id)}>
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
            <Col xs={6} className="position-fixed bottom-0 start-0 mb-3 ml-3">
                <Toast onClose={() => setShow2(false)} show={show2}>
                    <Toast.Header>
                        <img src="https://mobimg.b-cdn.net/v3/fetch/cd/cd9de44487eae25d189157640410f231.jpeg?w=1470&r=0.5625" height="30px" style={{borderRadius: "50%"}} className="rounded me-2" alt=""  />
                        <strong className="me-auto">3DHydrant</strong>
                        <small>{timeElapsed} минут назад</small>
                    </Toast.Header>
                    <Toast.Body>Сушки зачислятся через {20-timeElapsed} минут</Toast.Body>
                </Toast>
            </Col>
        </Container>
    );
};


export default ZakazPage;