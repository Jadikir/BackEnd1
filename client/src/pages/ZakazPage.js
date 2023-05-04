import React, {useContext} from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import {Context} from "../index";
import {useParams} from "react-router-dom";

const ZakazPage = () => {
    const{Zakaziki} = useContext(Context)
    const { id } = useParams();
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
                    <p>Стоимость заказа: {Zakaziki.zakazs[id - 1].price} руб.</p>
                </Col>
            </Row>
            <Row>
                <Col>
                    <p>Текст о заказе</p>
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