import React, {useContext, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Col, Pagination} from "react-bootstrap";
import OtzyvItem from "./OtzyvItem";

const OtzyvsList = observer(({Id})=>{
    const { Otzyviki } = useContext(Context);
    const pageSize = 5; // Количество отзывов на странице
    const [currentPage, setCurrentPage] = useState(1); // Текущая страница

    const otzyvs = Otzyviki.getUserotzyvs(Id);
    const totalOtzyvs = otzyvs.length;

    // Общее количество страниц
    const totalPages = Math.ceil(totalOtzyvs / pageSize);

    // Получение отзывов на текущей странице
    const getCurrentPageOtzyvs = () => {
        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        return otzyvs.slice(startIndex, endIndex);
    };

    // Обработчик смены страницы
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Обработчик перехода на предыдущую страницу
    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    // Обработчик перехода на следующую страницу
    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    return (
        <>
            {getCurrentPageOtzyvs().map(otzyv => (
                <Col key={otzyv.id} md={0} className="">
                    <OtzyvItem Otzyviki={otzyv} />
                </Col>
            ))}

            {/* Вывод пагинации */}
            <Pagination
                activePage={currentPage}
                itemsCountPerPage={pageSize}
                totalItemsCount={totalOtzyvs}
                onChange={handlePageChange}
                onPrevPage={handlePrevPage}
                onNextPage={handleNextPage}
            />
            <div>
                <button onClick={handlePrevPage} disabled={currentPage === 1}>Previous</button>
                <span>Page {currentPage} of {totalPages}</span>
                <button onClick={handleNextPage} disabled={currentPage=== totalPages}>Next</button>
            </div>
        </>
    );
});
export default OtzyvsList;