import React, {useContext} from 'react';
import {Col, Container,  Row} from "react-bootstrap";
import logo from '..//assets/logo.png';
import {Context} from "../index";

const OtzyvItem = ({Otzyviki}) => {
    const {user} =useContext(Context)
    return (
        <Container className="mt-4 rounded border">
            <Row>
                <Col className="mx-2 d-flex align-items-center">
                    <img src={logo} alt="3D Hydrant Logo" height="50" style={{ borderRadius: "50%", marginRight: "20px",marginLeft: "-10px" }} />
                    <div style={{ marginBottom: "5px"}}>
                        <Row>{user.getUsersWithId(Otzyviki.UserId).name}</Row>
                        <Row>{Otzyviki.Soderjanie}</Row>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default OtzyvItem;