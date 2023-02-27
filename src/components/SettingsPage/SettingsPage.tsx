import { faker } from '@faker-js/faker';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { changeFont, changeLanguage, changeSound, fonts, language, playSound, settingsState, sound } from '../../store/settingsSlice';
import { RootState } from '../../store/store';
import s from './SettingsPage.module.css';

export const SettingsPage = () => {
  const state: settingsState = useSelector((state: RootState) => state.settings)
  const dispatch = useDispatch()
  const { t, i18n } = useTranslation('common');
  const switchLanguage = (language: language) => {
    i18n.changeLanguage(language);
    faker.locale = language;
    dispatch(changeLanguage(language))
  }

  const switchSound = (sound: sound) => {
    dispatch(changeSound(sound))
    playSound(sound)
  }

  const switchFont = (font: fonts) => {
    dispatch(changeFont(font))
  }

  return (
    <div className={s.settingsPage}>
      <ul className={s.settingsList}>
        <li className={s.settingsListItem}>
          <h2>{t('settings.lang')}</h2>
          <div>
            <p>{t('settings.langDscr')}</p>
            <div className={s.variantsList}>
              <button onClick={() => switchLanguage('ru')}
                style={{ fontFamily: state.font }}
                className={state.lang === 'ru' && s.activeVar}>{t('settings.ru')}</button>
              <button onClick={() => switchLanguage('en')}
                style={{ fontFamily: state.font }}
                className={state.lang === 'en' && s.activeVar}>{t('settings.en')}</button>
            </div>
          </div>
        </li>
        <li className={s.settingsListItem}>
          <h2>{t('settings.sound')}</h2>
          <div>
            <p>{t('settings.soundDscr')}</p>
            <div className={s.variantsList}>
              <button onClick={() => switchSound('none')}
                style={{ fontFamily: state.font }}
                className={state.sound === 'none' && s.activeVar}>{t('settings.noSound')}</button>
              <button onClick={() => switchSound('click')}
                style={{ fontFamily: state.font }}
                className={state.sound === 'click' && s.activeVar}>{t('settings.click')}</button>
              <button onClick={() => switchSound('keyboard')}
                style={{ fontFamily: state.font }}
                className={state.sound === 'keyboard' && s.activeVar}>{t('settings.keyboard')}</button>
            </div>
          </div>
        </li>
        <li className={s.settingsListItem}>
          <h2>{t('settings.font')}</h2>
          <div>
            <div className={s.languageList}>
              {Object.values(fonts).filter((font) => isNaN(Number(font))).map(font =>
                <button
                  onClick={() => switchFont(font)}
                  key={font}
                  style={{ fontFamily: font }}
                  className={state.font === font && s.activeVar}>
                    {font}
                </button>)}
            </div>
          </div>
        </li>
      </ul>
    </div>
  )
}