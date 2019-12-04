import {IconButton} from '@material-ui/core';
import {KeyboardArrowLeft, KeyboardArrowRight} from '@material-ui/icons';
import React from 'react';

import './pagination.scss';

interface IPagination {
    paginationV: {
        totalPages: number,
        totalElements: number,
        actualPage: number
    };
    changePage: any;
}

function Pagination(props: IPagination ) {
    const { changePage } = props;
    const { actualPage, totalPages } = props.paginationV;

    const current = actualPage + 1 || 1;
    const total = totalPages || 1;
    const pageNav = current + ' / ' + total;

    const handleBackButtonClick = () => {
        changePage(actualPage - 1, 6);
    };

    const handleNextButtonClick = () => {
        changePage(actualPage + 1, 6);
    };

    return (
        <div className='pagination-container'>
            <IconButton
                id='BackButton'
                onClick={handleBackButtonClick}
                disabled={actualPage === 0}
                aria-label='previous page'>
                <KeyboardArrowLeft />
            </IconButton>
            <div>
                <span> {pageNav} </span>
            </div>
            <IconButton
                id='NextButton'
                onClick={handleNextButtonClick}
                disabled={(actualPage + 1) >= total}
                aria-label='next page'
            >
                <KeyboardArrowRight />
            </IconButton>
        </div>
    );
}

export default Pagination;
