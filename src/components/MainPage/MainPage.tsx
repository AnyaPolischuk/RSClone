import { ChangeEvent, FC, useEffect, useState } from 'react';
import {useTranslation} from 'react-i18next';

import s from './MainPage.module.css';
import TypingGameDemo from './TextField/TextField';
import ESC from '../../assets/image/esc.png';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

export const MainPage: FC = () => {
  const {t} = useTranslation('common');

  const font = useSelector((state: RootState) => state.settings.font)

  const [selectAmountOfWords, setSelectAmountOfWords] = useState('');
  const [selectQuote, setSelectQuote] = useState('');
  const [selectTime, setSelectTime] = useState('');

  const [time, setTime] = useState('No time');
  const [words, setAmountOfWords] = useState('Not words');
  const [quote, setQuote] = useState('Not quote');

  const [isActivePunctuation, setIsActivePunctuation] = useState(false);
  const [isActiveNumber, setIsActiveNumber] = useState(false);

  const [isInstallTimeYourself, setIsInstallTimeYourself] = useState(false);
  const [timeYourself, setTimeYourself] = useState('10');

  const [isInstallWordsYourself, setIsInstallWordsYourself] = useState(false);
  const [wordsYourself, setWordsYourself] = useState('3');

  const [isInstallTextYourself, setIsInstallTextYourself] = useState(false);
  const [textYourself, setTextYourself] = useState('Hey');

  const [isActiveHelp, setIsActiveHelp] = useState(false);


  const changeTime = (event: ChangeEvent<HTMLSelectElement>) => {
    if (event.target.value === 'install_yourself_time') {
      setIsInstallTimeYourself(true);
    }
    setTime(event.target.value);
    setSelectTime(event.target.value);
  };

  const changeAmountOfWords = (event: ChangeEvent<HTMLSelectElement>) => {
    if (event.target.value === 'install_yourself_words') {
      setIsInstallWordsYourself(true);
    }
    setAmountOfWords(event.target.value);
    setQuote('no-quote');
    setSelectAmountOfWords(event.target.value);
    setIsActivePunctuation(false);
    setIsActiveNumber(false);
  };

  const changeQuote = (event: ChangeEvent<HTMLSelectElement>) => {
    setQuote(event.target.value);
    setAmountOfWords('no-words');
    setSelectQuote(event.target.value);
    setIsActivePunctuation(false);
    setIsActiveNumber(false);
  };

  const changeActiveClassPunctuation = () => {
    setIsActivePunctuation((current) => !current);
    if (isActivePunctuation) {
      setQuote('no-quote');
      setAmountOfWords('no-words');
    }
  };

  const changeActiveClassNumber = () => {
    setIsActiveNumber((current) => !current);
    if (isActiveNumber) {
      setQuote('no-quote');
      setAmountOfWords('no-words');
    }
  };

  const handleInputTime = (event: ChangeEvent<HTMLInputElement>) => {
    const currentSetTime = event.target.value.replace(/\D/g, '');
    setTimeYourself(currentSetTime);
  };

  const handleInputWords = (event: ChangeEvent<HTMLInputElement>) => {
    const currentSetWords = event.target.value.replace(/\D/g, '').substr(0, 2);
    setWordsYourself(currentSetWords);
  };

  const handleInputText = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const currentSetText = event.target.value;
    setTextYourself(currentSetText);
  };

  const handleBtnSetTime = () => {
    setIsInstallTimeYourself(false);
  };

  const handleBtnSetWords = () => {
    setIsInstallWordsYourself(false);
  };

  const handleBtnSetText = () => {
    setIsInstallTextYourself(false);
  };

  const handleChangeTextBtn = () => {
    setIsInstallTextYourself(true);
  }

  const handleHelpBtn = () => {
    setIsActiveHelp(current => !current)
  }

  useEffect(() => {
    const handleEsc = (event: { keyCode: number; }) => {
       if (event.keyCode === 27) {
        setIsActiveHelp(false);
      }
    };
    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, []);

  return (
    <div className={s.wrapper}>
      <div className={s.container}>
        <div
         className={isActivePunctuation ? s.item_active : s.item}
         onClick={changeActiveClassPunctuation}
          >{t('gameSettings.punctuation')}</div>
        <div
         className={isActiveNumber ? s.item_active : s.item}
         onClick={changeActiveClassNumber}
         >{t('gameSettings.numbers')}</div>
         <div className={s.separator}></div>
        <select value={time} onChange={changeTime} className={s.time} style={{fontFamily: font}}>
          <option value="no-time">{t('gameSettings.time')}</option>
          <option value="15">{t('gameSettings.time15')}</option>
          <option value="30">{t('gameSettings.time30')}</option>
          <option value="60">{t('gameSettings.time60')}</option>
          <option value="120">{t('gameSettings.time120')}</option>
          <option value="install_yourself_time">{t('gameSettings.timeInstallYourself')}</option>
        </select>
        <select value={words} onChange={changeAmountOfWords} className={s.words} style={{fontFamily: font}}>
          <option value="no-words">{t('gameSettings.words')}</option>
          <option value="10">{t('gameSettings.words10')}</option>
          <option value="25">{t('gameSettings.words25')}</option>
          <option value="50">{t('gameSettings.words50')}</option>
          <option value="install_yourself_words">{t('gameSettings.wordsInstallYourself')}</option>
        </select>
        <select value={quote} onChange={changeQuote} className={s.quote} style={{fontFamily: font}}>
          <option value="no-quote">{t('gameSettings.sentences')}</option>
          <option value="short">{t('gameSettings.sentencesShort')}</option>
          <option value="medium">{t('gameSettings.sentencesMedium')}</option>
          <option value="long">{t('gameSettings.sentencesLong')}</option>
        </select>
        <div className={s.separator}></div>
        <div className={s.item} onClick={handleChangeTextBtn}>{t('gameSettings.change')}</div>
        <div className={isActiveHelp ? s.item_active : s.item} onClick={handleHelpBtn}>{t('gameSettings.help')}</div>
      </div>
      {isInstallTimeYourself &&
      <div className={s.installTime}>
        <div className={s.installTimeInput}>
          <input type='text'
           onInput={handleInputTime} 
           value={timeYourself} 
           className={s.inputTime}></input>  
          <button onClick={handleBtnSetTime} className={s.btnTime}>{t('gameSettings.setYourself')}</button>
        </div>
      </div>}
      {isInstallWordsYourself &&
      <div className={s.installWords}>
        <div className={s.installWordsInput}>
          <input type='text'
           onInput={handleInputWords} 
           value={wordsYourself} 
           className={s.inputWords}></input>  
          <button onClick={handleBtnSetWords} className={s.btnWords}>{t('gameSettings.setYourself')}</button>
        </div>
      </div>}
      {isInstallTextYourself &&
      <div className={s.installText}>
        <div className={s.installTextInput}>
          <p className={s.textTitle}>{t('gameSettings.writeOwnText')}</p>
          <textarea
           name="text"
           onChange={handleInputText} 
           value={textYourself} 
           className={s.inputText}></textarea>  
          <button onClick={handleBtnSetText} className={s.btnText}>{t('gameSettings.setYourself')}</button>
        </div>
      </div>}

        <TypingGameDemo
          amountOfWords={selectAmountOfWords}
          quote={selectQuote}
          isActiveNumber={isActiveNumber}
          isActivePunctuation={isActivePunctuation}
          selectTime={selectTime}
          timeYourself={timeYourself}
          isInstallTimeYourself={isInstallTimeYourself}
          wordsYourself={wordsYourself}
          textYourself={textYourself}
          isInstallTextYourself={isInstallTextYourself}
          isActiveHelp={isActiveHelp}
          />
        <div className={s.restart}>
          <img src={ESC} alt='esc' className={s.esc}/>
          <p>{t('gameSettings.restart')}</p>
        </div>
      </div>
  )
}