import React from 'react';
import {Col, Container,  Row} from "react-bootstrap";

const OtzyvItem = ({Otzyviki}) => {
    return (
        <Container className=" mt-4 rounded border" >
            <Row>
                    {Otzyviki.id}
                <Col>
                    {Otzyviki.description}
                </Col>
            </Row>
            </Container>
    );
};

export default OtzyvItem;