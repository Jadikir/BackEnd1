import React, {useContext} from 'react';
import {Badge, ListGroup} from "react-bootstrap";
import {Context} from "../index";
import {observer} from "mobx-react-lite";

const SorterBar = observer( ({showItemsWithParametr, setShowItemsWithParametr})=> {
    const{Zakaziki} = useContext(Context)

    const handleShowItemsWithParametr = (value) => {
        setShowItemsWithParametr(value);
    }

    return (
        <ListGroup as="ol">
            <ListGroup.Item
                as="li"
                className="d-flex justify-content-between align-items-start"
                action onClick={() => handleShowItemsWithParametr(false)}
            >
                <div className="fw-bold" > Мои заказы</div>
                <Badge bg="primary" pill>
                    {Zakaziki.getItemsWithParametr().length}
                </Badge>
            </ListGroup.Item>
            <ListGroup.Item
                as="li"
                className="d-flex justify-content-between align-items-start"
                action onClick={() => handleShowItemsWithParametr(true)}
            >
                <div className="fw-bold">Все заказы</div>

                <Badge bg="primary" pill>
                    {Zakaziki.zakazs.length}
                </Badge>
            </ListGroup.Item>
            <ListGroup.Item
                as="li"
                className="d-flex justify-content-between align-items-start"
                action onClick={() => handleShowItemsWithParametr(true)}
            >
                <div className="fw-bold">Делаются мной</div>

                <Badge bg="primary" pill>
                    {Zakaziki.zakazs.length}
                </Badge>
            </ListGroup.Item>
        </ListGroup>
    )
})


export default SorterBar;