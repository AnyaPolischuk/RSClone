import {useTranslation} from 'react-i18next';
import {Box, Button, Modal, TableCell, TableRow} from '@mui/material';
import {IUserData} from '../Api/Interface';
import {useState} from 'react';
import {WinStatistic} from '../MainPage/TextField/WinStatistic/WinStatistic';
import {shortText} from '../Helper/Validator';
import s from './UserStatistic.module.css';

interface IUserStatisticProps {
    gameInfo: IUserData
    isLeaders?: boolean
    index?: number
}

export const UserStatistic = ({gameInfo, isLeaders, index}: IUserStatisticProps) => {
    const {t} = useTranslation('common');
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>
            <TableRow sx={{ backgroundColor: '#e3e3e3'}} key={`${gameInfo._id}key`}>
                {index && <TableCell align="center">{index}</TableCell>}
                <TableCell align="center">{!isLeaders ? gameInfo.date : gameInfo.fullName}</TableCell>
                <TableCell title={gameInfo.text}
                           align="left">{!isLeaders ? gameInfo.text : shortText(gameInfo.text, 30)}</TableCell>
                <TableCell align="center">{gameInfo.correctChar}</TableCell>
                <TableCell align="center">{gameInfo.errorChar}</TableCell>
                <TableCell align="center">{gameInfo.percent}</TableCell>
                <TableCell align="center"><Button onClick={handleOpen}>{t('statistic.more')}</Button></TableCell>
            </TableRow>
            <Modal
                sx={{marginTop: '700px'}}
                open={open}
                onClose={handleClose}
            >
                <Box>
                    <WinStatistic startTime={gameInfo.startTime} endTime={null} length={gameInfo.length}
                                  errorChar={gameInfo.errorChar} correctChar={gameInfo.correctChar}
                                  percent={gameInfo.percent}
                                  text={gameInfo.text} currIndex={gameInfo.currIndex} time={gameInfo.time}
                                  isUserPage={true} closeModal={handleClose}/>
                </Box>
            </Modal>
        </>
    );
}
