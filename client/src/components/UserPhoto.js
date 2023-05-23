import React from 'react';
import {Col} from "react-bootstrap";

const UserPhoto = ({ photo, fallbackSrc, width, height, style }) => {
    return (
        <Col>
            {photo ? (
                <img src={`http://localhost:5000/${photo}`} width={width} height={height} style={style} />
            ) : (
                <img src={fallbackSrc} width={width} height={height} style={style} />
            )}
        </Col>
    );
};

export default UserPhoto;