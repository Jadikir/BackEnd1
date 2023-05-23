import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Col, Container} from "react-bootstrap";
import ZakazItem from "./ZakazItem";

const ZakazList = observer(({ showItemsWithParametr, someOtherCondition }) => {
    const { Zakaziki } = useContext(Context);
    const { user } = useContext(Context);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8; // Количество заказов на странице

    // Определение начального и конечного индексов для отображаемых заказов на текущей странице
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    let zakazsToDisplay = [];
    if (showItemsWithParametr) {
        zakazsToDisplay = Zakaziki.zakazs.slice(indexOfFirstItem, indexOfLastItem);
    } else if (someOtherCondition) {
        zakazsToDisplay = Zakaziki.getItemsWithParametr(user.user.id).slice(
            indexOfFirstItem,
            indexOfLastItem
        );
    } else {
        zakazsToDisplay = Zakaziki.getItemsWithCum(user.user.id).slice(
            indexOfFirstItem,
            indexOfLastItem
        );
    }

    // Обработчик для перехода на следующую страницу
    const nextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    // Обработчик для перехода на предыдущую страницу
    const prevPage = () => {
        setCurrentPage(currentPage - 1);
    };

    return (
        <>
            <>
                <Container>
                    {zakazsToDisplay.map((zakaz) => (
                        <Col key={zakaz.id} md={10} className="mt-3 mb-3">
                            <ZakazItem Zakaziki={zakaz} />
                        </Col>
                    ))}

                    {/* Кнопки перехода на предыдущую и следующую страницы */}
                    <div className="d-flex justify-content-around fixed-bottom pb-5 mb-4">
                        <div className="mr-3">
                            {currentPage > 1 ? (
                                <button className="btn btn-primary" onClick={prevPage}>
                                    Предыдущая страница
                                </button>
                            ) : (
                                <button className="btn btn-primary" style={{ visibility: 'hidden' }}>
                                    Предыдущая страница
                                </button>
                            )}
                        </div>
                        <div>
                            <span className="d-block text-center">{currentPage}</span>
                        </div>
                        <div className="ml-3">
                            {zakazsToDisplay.length === itemsPerPage ? (
                                <button className="btn btn-primary" onClick={nextPage}>
                                    Следующая страница
                                </button>
                            ) : (
                                <button className="btn btn-primary" style={{ visibility: 'hidden' }}>
                                    Следующая страница
                                </button>
                            )}
                        </div>
                    </div>
                </Container>
            </>
        </>
    );
});

export default ZakazList;