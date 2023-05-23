import React, {useContext} from 'react';
import {Col, Container,  Row} from "react-bootstrap";
import ava from '..//assets/ava.jpg';
import {Context} from "../index";

const OtzyvItem = ({Otzyviki}) => {
    const {user} =useContext(Context)
    return (
        <Container className="mt-4 rounded border">
            <Row>
                <Col className="mx-2 d-flex align-items-center">
                    {console.log(user.getUsersWithId(Otzyviki.UserId))}
                    {(!user.getUsersWithId(Otzyviki.UserId).photo)&& <img src={ava} alt="3D Hydrant Logo" height="50px" width ="50px"  style={{ borderRadius: "50%", marginRight: "20px",marginLeft: "-10px" }} />}

                    {(user.getUsersWithId(Otzyviki.UserId).photo)&& <img src={`http://localhost:5000/${user.getUsersWithId(Otzyviki.UserId).photo}`} alt="3D Hydrant Logo" height="50px" width ="50px" style={{ borderRadius: "50%", marginRight: "20px",marginLeft: "-10px" }} />}
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