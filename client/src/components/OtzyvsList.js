import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Col, Row} from "react-bootstrap";
import OtzyvItem from "./OtzyvItem";

const OtzyvsList = observer(()=>{
    const{Otzyviki} = useContext(Context)
    return(
        <>
            {Otzyviki.otzyvs.map(Otzyviki=>
                <Col key ={Otzyviki.id} md={0} className="">
                    <OtzyvItem Otzyviki={Otzyviki}/>
                </Col>
            )}
        </>
    )
})

export default OtzyvsList;