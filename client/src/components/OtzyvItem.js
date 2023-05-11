import React from 'react';
import {Col, Container,  Row} from "react-bootstrap";
import logo from 'E:/programs/NESonderPapka/BackEnd1/client/src/assets/logo.png';

const OtzyvItem = ({Otzyviki}) => {
    return (
        <Container className="mt-4 rounded border">
            <Row>
                <Col className="mx-2 d-flex align-items-center">
                    <img src={logo} alt="3D Hydrant Logo" height="50" style={{ borderRadius: "50%", marginRight: "20px",marginLeft: "-10px" }} />
                    <div style={{ marginBottom: "5px"}}>
                        <Row>ИМЯ ФАМИЛИЯ</Row>
                        <Row>{Otzyviki.description}</Row>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default OtzyvItem;