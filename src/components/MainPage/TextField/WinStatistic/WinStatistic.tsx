import React, {useEffect, useState} from 'react';

import s from './WinStatistic.module.css';
import {MyResponsivePie} from './Diagram/Diagram';
import {useCookies} from 'react-cookie';
import {API_URL} from '../../../Api/ApiHelper';
import {IUserSendData} from '../../../Api/Interface';
import {Alert} from '@mui/material';
import {IBanner} from '../../../Helper/Interfaces';
import {useTranslation} from 'react-i18next';

interface IWinStatisticProps {
    startTime: number | null;
    endTime: number | null;
    length: number;
    errorChar: number;
    correctChar: number;
    text: string;
    currIndex: number;
    time: number | null | undefined;
    isUserPage?: boolean
    closeModal?: () => void
    percent: number
}

export const WinStatistic = ({
                                 startTime, endTime, length, errorChar, correctChar,
                                 text, currIndex, time, isUserPage, closeModal, percent
                             }: IWinStatisticProps) => {

    const [isActiveCloseItem, setIsActiveCloseItem] = useState(true);
    const [cookies, setCookie] = useCookies(['access_token']);
    const initBanner: IBanner = {message: '', type: 'success'}
    const [bannerMessage, setBannerMessage] = useState(initBanner);
    const {t} = useTranslation('common');

    const countCorrectChar = () => {
        if (length && errorChar) {
            return length - errorChar;
        } else return length;
    }

    useEffect(() => {
        if (!isUserPage && localStorage.getItem('user') && cookies.access_token) {
            const userData: IUserSendData = {
                text,
                length,
                errorChar,
                correctChar,
                currIndex,
                time,
                endTime,
                startTime,
                percent
            }
            fetch(`${API_URL}/saveUserResult`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': cookies.access_token
                },
                body: JSON.stringify(userData)
            })
                .then(response => response.json())
                .then((data) => {
                    if (data.error) {
                        setBannerMessage({
                            message: data.error,
                            type: 'error'
                        })
                        setTimeout(() => setBannerMessage(initBanner), 5000)
                    } else {
                        setBannerMessage({
                            message: 'game.saved',
                            type: 'success'
                        })
                        setTimeout(() => setBannerMessage(initBanner), 5000)
                    }
                }).catch((error) => {
                console.log(error.message)
            })
        }
    }, []);

    const countFinishTime = () => {
        if (endTime && startTime) {
            const finishTime = ((endTime - startTime) / 1000).toFixed(2);
            return `${t('finishGameStatistics.finishTime')}: ${finishTime} ${t('finishGameStatistics.sec')}`;
        } else return `${t('finishGameStatistics.noTime')}`;
    }

    const countPercentOfCorrectTyping = () => {
        if (correctChar && length) {
            return Math.trunc((correctChar / length) * 100);
        } else return '0';
    }

    const countPercentOfUnwrittenText = () => {
        if (currIndex && length) {
            return Math.trunc(((length - currIndex - 1) / length) * 100);
        }
    }

    const showTimer = () => {
        if (time) {
            return `${t('finishGameStatistics.timer')} ${time} ${t('finishGameStatistics.sec')}`;
        } else return `${t('finishGameStatistics.noTimer')}`;
    }

  const playAgain = () => {
    window.location.reload();
  };

    const errorEndCorrectChars = [
        {
            'id': `${t('finishGameStatistics.correctChars')}`,
            'label': `${t('finishGameStatistics.correctChars')}`,
            'value': countCorrectChar(),
            'color': 'hsl(167, 70%, 50%)'
        },
        {
            'id': `${t('finishGameStatistics.incorrectChars')}`,
            'label': `${t('finishGameStatistics.incorrectChars')}`,
            'value': errorChar,
            'color': 'hsl(205, 70%, 50%)'
        },
    ]

    return (
        <div className={isActiveCloseItem ? s.wrapper : s.wrapper_not_active}>
            {bannerMessage.message &&
                <Alert severity={bannerMessage.type} sx={{mb: 2}}>{t(bannerMessage.message)}</Alert>}
            <div className={s.winTable}>
                <h2 className={s.title}>{t('finishGameStatistics.title')}</h2>
                <div className={s.text}>{t('finishGameStatistics.text')} <span className={s.phrase}>{text}</span></div>
                <div className={s.statistics}>
                    <MyResponsivePie data={errorEndCorrectChars}/>
                    <div className={s.container}>
                        <div>
                            <div className={s.item}>{countFinishTime()}</div>
                            <div className={s.item}>{t('finishGameStatistics.successRate')}{countPercentOfCorrectTyping()} %</div>
                        </div>
                        <div>
                            <div className={s.item}>{showTimer()}</div>
                            <div className={s.item}>{t('finishGameStatistics.unwrittenLetters')}{countPercentOfUnwrittenText()} %</div>
                        </div>
                    </div>
                </div>
                {!isUserPage ?
                    <button onClick={playAgain}
                            className={s.btn}>{t('finishGameStatistics.tryAgain')}
                    </button> : <button onClick={closeModal}
                                        className={s.btn}>CloseModal
                    </button>
                }
            </div>
        </div>
    )
}