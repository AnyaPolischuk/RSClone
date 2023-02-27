import {useTranslation} from 'react-i18next';
import {
    Alert,
    Box, Button,
    CircularProgress,
    Paper,
    Table, TableBody,
    TableCell,
    TableContainer, TableHead,
    TableRow, TextField
} from '@mui/material';
import {IUserData} from '../Api/Interface';
import React, {ChangeEvent, useEffect, useState} from 'react';
import {API_URL} from '../Api/ApiHelper';
import {UserStatistic} from '../UserStatistic/UserStatistic';
import ReactPaginate from 'react-paginate';
import s from './LeaderBoaerd.module.css'


export const LeaderBoard = () => {
    const {t} = useTranslation('common');
    const [usersData, setUsersData] = useState<IUserData[]>([])
    const [errors, setErrors] = useState('');
    const [preloader, setPreloader] = useState(true);
    const [itemOffset, setItemOffset] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(8);
    const endOffset = itemOffset + itemsPerPage;
    const [sortParam, setSortParam] = useState<'correctChar' | 'errorChar' | 'percent'>('percent');
    const [orderParam, setOrderParam] = useState('ASC');
    const [isCorrect, setIsCorrect] = useState(false)
    const [isIncorrect, setIsIncorrect] = useState(false)
    const [isPercent, setIsPercent] = useState(false)


    const handlePageClick = (event: { selected: number; }) => {
        const newOffset = (event.selected * itemsPerPage) % usersData.length;
        setItemOffset(newOffset);
    };

    const onChangePageNumber = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const pages = parseInt(event.target.value)
        if (pages >= 1) {
            setItemsPerPage(pages)
        } else {
            setItemsPerPage(1)
        }
    }

    const onButtonClick = (type: string) => {
        switch (type) {
            case 'correct':
                setSortParam('correctChar')
                setIsCorrect(!isCorrect)
                break;
            case 'incorrect':
                setSortParam('errorChar');
                setIsIncorrect(!isIncorrect)
                break;
            case 'percent':
                setSortParam('percent')
                setIsPercent(!isPercent)
                break;
        }
    }

    const parseUserData = () => {
        fetch(`${API_URL}/getLeaders`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then((data) => {
                if (data.error) {
                    setErrors(data.error)
                    setTimeout(() => setErrors(''), 10000)
                } else {
                    (data as IUserData[]).sort((user, userNext) => userNext[sortParam] - user[sortParam])
                    setUsersData(data)
                }
                setPreloader(false)
            }).catch((error) => {
            console.log(error.message)
        })

    }

    const sortData = () => {
        if (orderParam === 'ASC') {
            usersData.sort((user, userNext) => user[sortParam] - userNext[sortParam])
        } else {
            usersData.sort((user, userNext) => userNext[sortParam] - user[sortParam])
        }
    }

    useEffect(() => {
        parseUserData()
    }, [])

    useEffect(() => {
        switch (sortParam) {
            case 'correctChar':
                if (isCorrect) {
                    setOrderParam('DESC')
                } else setOrderParam('ASC')
                break;
            case 'errorChar':
                if (isIncorrect) {
                    setOrderParam('DESC')
                } else setOrderParam('ASC')
                break;
            case 'percent':
                if (isPercent) {
                    setOrderParam('DESC')
                } else setOrderParam('ASC')
                break;
        }
        sortData()
    }, [sortParam, isCorrect, isIncorrect, isPercent]);


    const currentItems = usersData.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(usersData.length / itemsPerPage);

    return (
        <div className={s.container}>
            {errors && <Alert severity="error" sx={{mb: 2}}>{t(errors)}</Alert>}
            {preloader ?
                <CircularProgress/>
                :
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    color: 'black',
                    background: '#e3e3e3',
                    width: 'fit-content',
                    padding: 2,
                    flexDirection: 'column',
                    borderRadius: '25px'
                }}>
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                    }}>
                        <h1 className={s.title}>{t('statistic.leader')}</h1>
                        <TextField
                            id="filled-number"
                            label={t('pagination.pages')}
                            type="number"
                            value={itemsPerPage}
                            onChange={onChangePageNumber}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="standard"
                            sx={{maxWidth: '250px'}}
                        /></Box>
                    {usersData &&
                        <TableContainer component={Paper}>
                            <Table sx={{minWidth: 700}} aria-label="customized table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{backgroundColor: '#e3e3e3'}} align="center">#</TableCell>
                                        <TableCell sx={{backgroundColor: '#e3e3e3'}} align="center">{t('statistic.name')}</TableCell>
                                        <TableCell sx={{backgroundColor: '#e3e3e3'}} align="center">{t('statistic.text')}</TableCell>
                                        <TableCell sx={{backgroundColor: '#e3e3e3'}} align="center">
                                            <button className={s.button}
                                                    onClick={() => onButtonClick('correct')}>{t('statistic.correct')}</button>
                                        </TableCell>
                                        <TableCell sx={{backgroundColor: '#e3e3e3'}} align="center">
                                            <button className={s.button}
                                                    onClick={() => onButtonClick('incorrect')}>{t('statistic.incorrect')}</button>
                                        </TableCell>
                                        <TableCell sx={{backgroundColor: '#e3e3e3'}} align="center">
                                            <button className={s.button}
                                                    onClick={() => onButtonClick('percent')}>{t('statistic.percent')}</button>
                                        </TableCell>
                                        <TableCell sx={{backgroundColor: '#e3e3e3'}} align="center">---</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {currentItems.map((userData, index) =>
                                        <UserStatistic gameInfo={userData}
                                                       key={userData._id}
                                                       isLeaders={true}
                                                       index={itemOffset + index + 1}/>)}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    }
                    <ReactPaginate
                        activeClassName={`${s.item} ${s.active}`}
                        breakClassName={`${s.item} ${s.breakMe}`}
                        breakLabel={'...'}
                        nextLabel={t('pagination.next')}
                        previousLabel={t('pagination.previous')}
                        containerClassName={s.pagination}
                        disabledClassName={s.disabledPage}
                        marginPagesDisplayed={2}
                        nextClassName={`${s.item} ${s.next}`}
                        onPageChange={handlePageClick}
                        pageCount={pageCount}
                        pageClassName={`${s.item} ${s.paginationPage}`}
                        pageRangeDisplayed={5}
                        previousClassName={`${s.item} ${s.previous}`}
                    />
                </Box>}
        </div>
    );
}