import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Col, Row} from "react-bootstrap";
import ZakazItem from "./ZakazItem";

const ZakazList = observer(({showItemsWithParametr,someOtherCondition})=>{
    const{Zakaziki} = useContext(Context)
    const{user} = useContext(Context)
    const zakazsToDisplay = showItemsWithParametr
        ? Zakaziki.zakazs
        : someOtherCondition
            ? Zakaziki.getItemsWithParametr(user.user.id)
            : Zakaziki.getItemsWithCum(user.user.id);

    return(
        <>
            {zakazsToDisplay.map((zakaz) => (
                <Col key={zakaz.id} md={10} className="mt-3 mb-3">
                    <ZakazItem Zakaziki={zakaz} />
                </Col>
            ))}
        </>
    )
})

export default ZakazList;