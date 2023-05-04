import React, {useContext} from 'react';
import {Accordion, Button} from "react-bootstrap";
import {useLocation, useNavigate} from 'react-router-dom'
import {LOGIN_ROUTE, ZAKAZPAGE_ROUTE} from "../utils/consts";
import {Context} from "../index";


const ZakazItem = ({Zakaziki}) => {
    const navigate = useNavigate()
    const {user} = useContext(Context)
    const location = useLocation()
    return (
        <Accordion>
            <Accordion.Item eventKey="0">
                <Accordion.Header>Первое слово на татарском</Accordion.Header>
                <Accordion.Body className="d-flex align-items-center">
                    <div className="flex-grow-1">
                        Что-то на татарском
                    </div>
                    <div className="ml-auto">
                        {user.isAuth &&
                        <Button variant="danger" as="input" type="button" value="ВЫРЕЗАТЬ ТВАРЬ" onClick={() => navigate(ZAKAZPAGE_ROUTE + '/' + Zakaziki.id)}/>}
                        <Button variant="info" as="input" type="button" value="Нажми если интересно" onClick={() => navigate(ZAKAZPAGE_ROUTE + '/' + Zakaziki.id)}/>

                    </div>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    );
};

export default ZakazItem;