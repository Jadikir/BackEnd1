import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Col, Row} from "react-bootstrap";
import OtzyvItem from "./OtzyvItem";

const OtzyvsList = observer(({Id})=>{
    const{Otzyviki} = useContext(Context)
    console.log(Otzyviki.getUserotzyvs(Id))
    return(
        <>
            {Otzyviki.getUserotzyvs(Id)?.map(otzyv => (
                <Col key={otzyv.id} md={0} className="">
                    <OtzyvItem Otzyviki={otzyv} />
                </Col>
            ))}
        </>
    )
})
export default OtzyvsList;