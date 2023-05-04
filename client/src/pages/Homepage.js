import React from 'react';
import {Col, Container, Row} from "react-bootstrap";
import ZakazList from "../components/ZakazList";


const Homepage = () => {
        return(
            <Container>
                <Row>
                    <Col md={4}>
                    </Col>
                    <Col md ={12}>
                        <ZakazList/>
                    </Col>
                </Row>
            </Container>
        );


};

export default Homepage;