import {useTranslation} from 'react-i18next';
import {Box, Button, Modal, TableCell, TableRow} from '@mui/material';
import {IUserData} from '../Api/Interface';
import {useState} from 'react';
import {WinStatistic} from '../MainPage/TextField/WinStatistic/WinStatistic';

interface IUserStatisticProps {
    gameInfo: IUserData
}

export const UserStatistic = ({gameInfo}: IUserStatisticProps) => {
    const {t} = useTranslation('common');
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>
            <TableRow key={`${gameInfo._id}key`}>
                <TableCell align="center">{gameInfo.date}</TableCell>
                <TableCell align="center">{gameInfo.text}</TableCell>
                <TableCell align="center">{gameInfo.correctChar}</TableCell>
                <TableCell align="center">{gameInfo.errorChar}</TableCell>
                <TableCell align="center">{Math.trunc((gameInfo.correctChar / gameInfo.length) * 100)}</TableCell>
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
                                  text={gameInfo.text} currIndex={gameInfo.currIndex} time={gameInfo.time} isUserPage={true} closeModal={handleClose}/>
                </Box>
            </Modal>
        </>
    );
}