import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { API_URL } from '../../Api/ApiHelper';
import {
    Alert,
    Box,
    CircularProgress,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@mui/material';
import {useCookies} from 'react-cookie'
import {IUserData} from '../../Api/Interface';
import {UserStatistic} from '../../UserStatistic/UserStatistic';
import s from './UresProfile.module.css';

interface IUserProfileProps {
  toSingPage: () => void;
}

export const UserProfile = ({ toSingPage }: IUserProfileProps) => {
  const { t } = useTranslation('common');
  const [cookies, setCookie] = useCookies(['access_token']);
  const [usersData, setUsersData] = useState<IUserData[]>();
  const [errors, setErrors] = useState('');
  const [preloader, setPreloader] = useState(true);
  const user = JSON.parse(localStorage.getItem('user') ?? '{"fName": "", "lName": ""}');

  const parseUserData = () => {
    fetch(`${API_URL}/userData`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': cookies.access_token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          setErrors(data.error);
          setTimeout(() => toSingPage(), 10000);
        } else {
          setUsersData(data);
        }
        setPreloader(false);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  useEffect(() => {
    parseUserData();
  }, []);

    return (
        <div className={s.wrapper}>
            {preloader ?
                <CircularProgress/>
                :
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    background: '#e3e3e3',
                    width: 'fit-content',
                    padding: 2,
                    flexDirection: 'column',
                    borderRadius: '25px'
                }}>
                    <h1>{t('user.title')}</h1>
                    <h3>{t('user.welcome', {user:`${user.fName} ${user.lName}`})}</h3>
                    {errors && <Alert severity="error">{t(errors)}</Alert>}
                    <button className={s.button} onClick={toSingPage}>{t('button.logout')}</button>
                    {usersData &&
                        <TableContainer component={Paper}>
                            <Table sx={{minWidth: 700, backgroundColor: '#e3e3e3'}} aria-label="customized table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center">{t('statistic.date')}</TableCell>
                                        <TableCell align="center">{t('statistic.text')}</TableCell>
                                        <TableCell align="center">{t('statistic.correct')}</TableCell>
                                        <TableCell align="center">{t('statistic.incorrect')}</TableCell>
                                        <TableCell align="center">{t('statistic.percent')}</TableCell>
                                        <TableCell align="center">---</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {usersData.map(userData => <UserStatistic gameInfo={userData} key={userData._id}/>)}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    }
                </Box>}
        </div>
    );
}