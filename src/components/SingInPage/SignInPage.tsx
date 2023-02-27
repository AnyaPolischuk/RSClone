import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Register} from './Register/Register';
import {Login} from './Login/Login';
import {Alert, Box, Button} from '@mui/material';
import { useCookies } from 'react-cookie'
import {UserProfile} from './UserProfile/UserProfile';
import s from './SignInPage.module.css';


export const SignInPage = () => {
  const HIDE_BANNER_TIME = 5000;
  const { t } = useTranslation('common');
  const [isLogin, setIsLogin] = useState(true);
  const [isLoginSuccess, setIsLoginSuccess] = useState(false);
  const [bannerMessage, setBannerMessage] = useState('');
  const [cookies, setCookie, removeCookie] = useCookies(['access_token']);

  useEffect(() => {
    if (localStorage.getItem('user') && cookies.access_token) {
      setIsLoginSuccess(true);
    }
  }, []);

  const successRegister = () => {
    setIsLogin(true);
    setBannerMessage('register.success');
    setTimeout(() => setBannerMessage(''), HIDE_BANNER_TIME);
  };

  const successLogin = () => {
    setIsLogin(true);
    setIsLoginSuccess(true);
    setBannerMessage('login.success');
    setTimeout(() => setBannerMessage(''), HIDE_BANNER_TIME);
  };

  const successLogout = () => {
    removeCookie('access_token');
    localStorage.removeItem('user');
    setIsLogin(true);
    setIsLoginSuccess(false);
    setBannerMessage('logout.success');
    setTimeout(() => setBannerMessage(''), HIDE_BANNER_TIME);
  };

    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center',
            mt: 3,
            color: 'black'
        }}>
            {bannerMessage && <Alert severity="success" sx={{mb: 2}}>{t(bannerMessage)}</Alert>}
            <Box sx={{display: 'flex', justifyContent: 'center', mb: 2}}>
                { isLoginSuccess ? <UserProfile toSingPage={successLogout}/> :
                    isLogin ? <Login toSingPage={successLogin}/> : <Register toLogin={successRegister}/>
                } 
            </Box>
            <Box sx={{display: 'flex', justifyContent: 'center'}}>
            {isLoginSuccess ? '' : isLogin ?
                <button className={s.button} onClick={() => setIsLogin(false)}>{t('button.register')}</button>
                : <button className={s.button} onClick={() => setIsLogin(true)}>{t('button.login')}</button>}
            </Box>
        </Box>
    )
}