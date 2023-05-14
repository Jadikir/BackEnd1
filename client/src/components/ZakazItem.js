import React, {useContext, useState} from 'react';
import {Accordion, Button,Modal} from "react-bootstrap";
import {useNavigate} from 'react-router-dom'
import {HOMEPAGE_ROUTE, ZAKAZPAGE_ROUTE} from "../utils/consts";
import {Context} from "../index";
import {deleteZakaz, getZakazs} from "../http/ZakazAPI";

const ZakazItem = ({Zakaziki}) => {
    const navigate = useNavigate()
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const {user} = useContext(Context)
    const handleDelete = async (id) => {
        try {
            const data =  await deleteZakaz(id);
            handleClose(true)
            window.location.reload()
            return data
        } catch (e) {
            alert(e.response.data.message);
        }
    };
    return (
        <Accordion>
            {console.log(Zakaziki.name) }
            <Accordion.Item eventKey="0">
                <Accordion.Header>{Zakaziki.name}</Accordion.Header>
                <Accordion.Body className="d-flex align-items-center">
                    <div className="flex-grow-1">
                        Что-то на татарском
                    </div>
                    {(user.isAuth&&
                        <Button variant="danger" variant="outline-danger" onClick={handleShow}className="mx-2" >
                            УНИЧТОЖИТЬ
                        </Button>)}
                        <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Подтверждение</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>Этот заказ точно нарушает политику капибар?</Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>
                                    НЕт, миссклик
                                </Button>
                                <Button variant="primary" onClick={() => handleDelete(Zakaziki.id)}>
                                    Да,вырезать
                                </Button>
                            </Modal.Footer>
                        </Modal>
                        <Button className="mx-2" variant="info" as="input" type="button" value="Нажми если интересно" onClick={() => navigate(ZAKAZPAGE_ROUTE + '/' + Zakaziki.id)}/>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    );
};

export default ZakazItem;