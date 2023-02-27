import {useEffect, useState} from 'react';
import useTypingGame from 'react-typing-game-hook';
import {faker} from '@faker-js/faker';
import {useTranslation} from 'react-i18next';

import {WinStatistic} from './WinStatistic/WinStatistic';
import s from './TextField.module.css';
import {KeyboardHelper} from './Keyboard/Keyboard';
import {useCookies} from 'react-cookie';
import {SaveModal} from './SaveModal/SaveModal';
import { playSound } from '../../../store/settingsSlice';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';

interface ITypingGameDemoProps {
    amountOfWords: string;
    quote: string;
    isActiveNumber: boolean;
    isActivePunctuation: boolean;
    selectTime: string;
    timeYourself: string;
    isInstallTimeYourself: boolean;
    wordsYourself: string;
    textYourself: string;
    isInstallTextYourself: boolean;
    isActiveHelp: boolean;
}

export const TypingGameDemo =
    ({
         amountOfWords, quote, isActiveNumber,
         isActivePunctuation, selectTime, timeYourself,
         isInstallTimeYourself, wordsYourself, textYourself,
         isInstallTextYourself, isActiveHelp
     }: ITypingGameDemoProps) => {

        const {t} = useTranslation('common');
        const sound = useSelector((state: RootState) => state.settings.sound)
        const [text, setText] = useState('');
        const [isWin, setIsWin] = useState(false);
        const [counter, setCounter] = useState<number | null>();
        const [time, setTime] = useState<number | null>();
        const [isStartGame, setIsStartGame] = useState(false);
        const {
            states: {
                charsState,
                length,
                currIndex,
                correctChar,
                errorChar,
                startTime,
                endTime
            },
            actions: {insertTyping, resetTyping, deleteTyping}
        } = useTypingGame(text);
        const [isSaveAlert, setIsSaveAlert] = useState(false);

        const isSkipMessage = localStorage.getItem('skipSave')
        const [cookies, setCookie] = useCookies(['access_token']);

        const handleKey = (key: string) => {
            if (key === 'Escape') {
                resetTyping();
            } else if (key === 'Backspace') {
                deleteTyping(false);
            } else if (key.length === 1) {
                insertTyping(key);
            }
        };

        const onClickSaveAlert = (actions: string) => {
            switch (actions) {
                case 'close':
                    setIsSaveAlert(false);
                    setIsStartGame(true);
                    break;
                case 'permanent':
                    setIsSaveAlert(false);
                    setIsStartGame(true);
                    localStorage.setItem('skipSave', 'true')
                    break;
            }
        }

        const handleStartGameClick = () => {
            if (isSkipMessage === 'true' || cookies.access_token || isStartGame) {
                setIsStartGame(true);
            } else {
                setIsSaveAlert(true);
                setIsStartGame(false);
            }

        }

        useEffect(() => {
            switch (selectTime) {
                case '15':
                    setCounter(15);
                    setTime(15);
                    setIsStartGame(false);
                    break;
                case '30':
                    setCounter(30);
                    setTime(30);
                    setIsStartGame(false);
                    break;
                case '60':
                    setCounter(60);
                    setTime(60);
                    setIsStartGame(false);
                    break;
                case '120':
                    setCounter(120);
                    setTime(120);
                    setIsStartGame(false);
                    break;
                case 'install_yourself_time':
                    setCounter(+timeYourself);
                    setTime(+timeYourself);
                    setIsStartGame(false);
                    break;
                default:
                    setCounter(null);
                    setTime(null);
                    setIsStartGame(false);
            }
        }, [selectTime, timeYourself]);

        useEffect(() => {
            if (counter && startTime) {
                const timer = setInterval(() => setCounter(counter - 1), 1000);
                return () => clearInterval(timer);
            }
        }, [counter, startTime]);

        useEffect(() => {
            switch (amountOfWords) {
                case '10':
                    setText(faker.lorem.words(10));
                    setIsStartGame(false);
                    break;
                case '25':
                    setText(faker.lorem.words(25));
                    setIsStartGame(false);
                    break;
                case '50':
                    setText(faker.lorem.words(50));
                    setIsStartGame(false);
                    break;
                case 'install_yourself_words':
                    setText(faker.lorem.words(+wordsYourself));
                    setIsStartGame(false);
                    break;
                default:
                    setText(faker.lorem.sentence());
                    setIsStartGame(false);
            }
        }, [amountOfWords, faker, wordsYourself]);

        useEffect(() => {
            switch (quote) {
                case 'short':
                    setText(faker.lorem.sentence(5));
                    setIsStartGame(false);
                    break;
                case 'medium':
                    setText(faker.lorem.sentence(20));
                    setIsStartGame(false);
                    break;
                case 'long':
                    setText(faker.lorem.sentence(40));
                    setIsStartGame(false);
                    break;
                default:
                    setText(faker.lorem.sentence(3));
                    setIsStartGame(false);
            }
        }, [quote, faker]);

        useEffect(() => {
            if (isActiveNumber && isActivePunctuation) {
                setText(`${faker.lorem.words(2)}. ${faker.lorem.words(2)}! ${faker.address.buildingNumber()} ${faker.lorem.words(1)}. ${faker.lorem.words(2)}, ${faker.address.buildingNumber()} '${faker.lorem.words(1)}'; ${faker.lorem.words(2)}?`);
                setIsStartGame(false);
            } else if (isActiveNumber) {
                setText(faker.lorem.words(3) + ' ' + faker.address.buildingNumber()
                    + ' ' + faker.lorem.words(2) + ' ' + faker.address.buildingNumber()
                    + ' ' + faker.lorem.words(2));
                setIsStartGame(false);
            } else if (isActivePunctuation) {
                setText(`${faker.lorem.words(2)}, ${faker.lorem.words(2)}: ${faker.lorem.words(1)}. ${faker.lorem.words(2)}! "${faker.lorem.words(1)}"; ${faker.lorem.words(2)}?`);
                setIsStartGame(false);
            } else {
                setText(faker.lorem.sentence(4));
                setIsStartGame(false);
            }
        }, [isActiveNumber, isActivePunctuation, faker]);

        useEffect(() => {
            if (endTime) {
                setIsWin(true);
            }
        }, [endTime]);

        useEffect(() => {
            if (isInstallTextYourself) {
                setText(textYourself);
                setIsStartGame(false);
            }
        }, [isInstallTextYourself, textYourself]);


        useEffect(() => {
            const handleEsc = (event: { keyCode: number; }) => {
                if (event.keyCode === 27) {
                    setIsStartGame(false);
                }
            };
            window.addEventListener('keydown', handleEsc);

            return () => {
                window.removeEventListener('keydown', handleEsc);
            };
        }, []);

        return (
            <>
                <SaveModal isModal={isSaveAlert} fnCallback={onClickSaveAlert}/>
                <div className={s.wrapper}>
                    {!isStartGame && <p className={s.startInfo}>{t('gameSettings.infoAboutStart')}</p>}
                    <div className={s.timer}>{counter}</div>
                    <div
                        className={s.typingTest}
                        onKeyDown={(e) => {
                            handleKey(e.key);
                            playSound(sound)
                            e.preventDefault();
                        }}
                        onClick={handleStartGameClick}
                        tabIndex={0}
                    >
                        <div className={isStartGame ? s.startIndicatorActive : s.startIndicator}></div>
                        {text.split('').map((char: string, index: number) => {

                            const state = charsState[index];
                            const color = state === 0 ? '#444' : state === 1 ? '#dfd7af' : '#ca4754';
                            return (
                                <span
                                    key={`${char} + ${index}`}
                                    style={{color}}
                                    className={currIndex + 1 === index ? 'curr-letter' : ''}
                                >
                                    {char}
                                </span>
                            );
                        })}

                    </div>
                    {((isWin || counter === 0) && !isInstallTimeYourself) &&
                        <WinStatistic
                            startTime={startTime}
                            endTime={endTime}
                            length={length}
                            errorChar={errorChar}
                            correctChar={correctChar}
                            text={text}
                            currIndex={currIndex}
                            time={time}
                            percent={Math.trunc((correctChar / text.length) * 100)}
                        />}
                    {isActiveHelp &&
                        <KeyboardHelper
                            text={text}
                            currIndex={currIndex}
                            insertTyping={insertTyping}
                        />}
                </div>
            </>
        );
    };

export default TypingGameDemo;
