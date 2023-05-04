import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Col, Row} from "react-bootstrap";
import ZakazItem from "./ZakazItem";

const ZakazList = observer(()=>{
    const{Zakaziki} = useContext(Context)
    return(
        <>
            {Zakaziki.zakazs.map(Zakaziki=>
                <Col key ={Zakaziki.id} md={20} className="mt-3 mb-3">
                    <ZakazItem Zakaziki={Zakaziki}/>
                </Col>
            )}
        </>
    )
})

export default ZakazList;