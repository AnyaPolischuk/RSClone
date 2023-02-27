import { NavLink } from 'react-router-dom';
import s from './Header.module.css';
import logo from '../../assets/image/keyboard_logo.png';
import keyboard from '../../assets/image/keyboard.png';
import info from '../../assets/image/info.png';
import settings from '../../assets/image/settings.png';
import addUser from '../../assets/image/add_user.png';
import leader from '../../assets/image/leaders.png';

import {useTranslation} from 'react-i18next';

export const Header = () => {
  const { t } = useTranslation('common');

    return (
        <header className={s.header}>
            <div className={s.logo}>
                <NavLink to={'/'}>
                    <img className={s.logo} alt='logo' src={logo}></img>
                </NavLink>
                <span className={s.title}>{t('title', {app:'MonkeyType'})}</span>
            </div>
            <div className={s.menuItems}>
                <NavLink to={'/'}>
                    <img className={s.keyboard} alt='keyboard' src={keyboard}></img>
                </NavLink>
                <NavLink to={'/InfoPage'}>
                    <img className={s.info} alt='info' src={info}></img>
                </NavLink>
                <NavLink to={'/Leaders'}>
                    <img className={s.leader} alt='leader' src={leader}></img>
                </NavLink>
                <NavLink to={'/SettingsPage'}>
                    <img className={s.settings} alt='settings' src={settings}></img>
                </NavLink>
                <NavLink to={'/SignInPage'}>
                    <img className={s.addUser} alt='addUser' src={addUser}></img>
                </NavLink>
            </div>
        </header>
    )
}

