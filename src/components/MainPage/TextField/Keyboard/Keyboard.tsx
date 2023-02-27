import { useEffect, useRef, useState } from 'react';
import Keyboard from 'react-simple-keyboard';
import {useTranslation} from 'react-i18next';
import layoutRu from 'simple-keyboard-layouts/build/layouts/russian';
import layoutEn from 'simple-keyboard-layouts/build/layouts/english';


import 'react-simple-keyboard/build/css/index.css';
import s from './Keyboard.module.css';

interface IKeyboardHelper {
  text: string,
  currIndex: number,
  insertTyping: (char?: string | undefined) => void
}

export const KeyboardHelper = ({  text, currIndex, insertTyping }: IKeyboardHelper) => {
  const [layout, setLayout] = useState('default');
  const [layoutLang, setLayoutLang] = useState(layoutEn);
  const [letter, setLetter] = useState('');
  const keyboard = useRef();
  const {t, i18n} = useTranslation('common');
 
  const handleShift = () => {
    const newLayoutName = layout === 'default' ? 'shift' : 'default';
    setLayout(newLayoutName);
  };
  
  const onKeyPress = (button: string) => {
    if (button === '{shift}' || button === '{lock}') {
      handleShift();
    } 
  }

  const onChange = (letter: string) => {
    setLetter(letter);
    insertTyping(letter[letter.length - 1]);
  }

  useEffect(() => {
    if (keyboard.current) {
      // @ts-ignore
      const allElements = keyboard.current.buttonElements;
      const arrayOfLetters = Object.keys(allElements);
      const currentLetter = arrayOfLetters.filter((item) => item === text[currIndex + 1]);
      const prevLetter = arrayOfLetters.filter((item) => item === text[currIndex]);
      const letterAfterBackspace = arrayOfLetters.filter((item) => item === text[currIndex + 2]);

      const curChar = currentLetter[0] ? currentLetter[0] : '{space}';
      const prevChar = prevLetter[0] ? prevLetter[0] : '{space}';
      const backspaceChar =letterAfterBackspace[0] ? letterAfterBackspace[0] : '{space}';

      // @ts-ignore
      keyboard.current.removeButtonTheme(prevChar, 'hg-activeButton');
      // @ts-ignore
      keyboard.current.addButtonTheme(curChar, 'hg-activeButton');

      const handleBackspace = (event: { keyCode: number; }) => {
        if (event.keyCode === 8) {
          if (keyboard.current) {
            // @ts-ignore
            keyboard.current.removeButtonTheme(backspaceChar, 'hg-activeButton');
          }
       }
     };
       window.addEventListener('keydown', handleBackspace);
 
     return () => {
       window.removeEventListener('keydown', handleBackspace);
     };
    }
   
  }, [text, currIndex, letter]);

  useEffect(() => {
    if (t('gameSettings.keyboardLang') === 'ru') {
      setLayoutLang(layoutRu);
    } else if (t('gameSettings.keyboardLang') === 'en') {
      setLayoutLang(layoutEn);
    }
  }, [t('gameSettings.keyboardLang')]);

  return (
    <div className={s.wrapper}>
      <div className='App'>
      <Keyboard
        keyboardRef={r => (keyboard.current = r)}
        layoutName={layout}
        layout={layoutLang.layout}
        onKeyPress={onKeyPress}
        onChange={onChange}
      />
    </div>
    </div>
  );
}