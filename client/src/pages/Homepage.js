import React, {useContext, useEffect, useState} from 'react';
import {Button, Col, Container, Form, Modal, Row} from "react-bootstrap";
import ZakazList from "../components/ZakazList";
import SorterBar from "../components/SorterBar";
import {Context} from "../index";
import {createZakaz, getZakazs} from "../http/ZakazAPI";


const Homepage = () => {

    const [showItemsWithParametr, setShowItemsWithParametr] = useState(true);
    const [someOtherCondition,setSomeOtherCondition] = useState(false);
    const [show, setShow] = useState(false);
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const {user} = useContext(Context)
    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handlePriceChange = (event) => {
        setPrice(event.target.value);
    };

    const handleSaveChanges = async () => {
        if (name.trim() === "" || price.trim() === "") {
            return;
        }
        const data = await createZakaz(name, price, description)
        window.location.reload()
        handleClose();
    };

    return (
        <Container>
            <Row>
                <Col md={2} className="mt-4">
                    <SorterBar
                        setShowItemsWithParametr={setShowItemsWithParametr}
                        showItemsWithParametr={showItemsWithParametr}
                        setSomeOtherCondition={setSomeOtherCondition}
                        someOtherCondition={someOtherCondition}
                    />
                    {(user.isAuth&&<Button
                        variant="danger"
                        variant="outline-danger"
                        onClick={handleShow}
                        className="mx-2 mt-4"
                        size="lg"
                    >
                        Сделать заказ
                    </Button>)}
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Создание заказа</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Введите название</Form.Label>
                                    <Form.Control
                                        type="name"
                                        placeholder="Типо имя"
                                        autoFocus
                                        value={name}
                                        onChange={handleNameChange}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Введите стоимость</Form.Label>
                                    <Form.Control
                                        type="price"
                                        placeholder="300$"
                                        autoFocus
                                        value={price}
                                        onChange={handlePriceChange}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group
                                    className="mb-3"
                                    controlId="exampleForm.ControlTextarea1"
                                >
                                    <Form.Label>Введите описание</Form.Label>
                                    <Form.Control as="textarea" value={description} onChange={e => setDescription(e.target.value)} rows={3} />
                                </Form.Group>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                ПЕРЕДУМАЛ
                            </Button>
                            <Button variant="primary" onClick={handleSaveChanges} disabled={name.trim() === "" || price.trim() === ""}>
                                Создать заказ
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </Col>
                <Col md={10}>
                    <ZakazList
                        setShowItemsWithParametr={setShowItemsWithParametr}
                        showItemsWithParametr={showItemsWithParametr}
                        setSomeOtherCondition={setSomeOtherCondition}
                        someOtherCondition={someOtherCondition}
                    />
                </Col>
            </Row>
        </Container>
    );
};

export default Homepage;