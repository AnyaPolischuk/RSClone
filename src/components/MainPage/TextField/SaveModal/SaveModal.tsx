import {Modal} from '@mui/material';
import s from './SaveModal.module.css';
import {NavLink} from 'react-router-dom';
import {useTranslation} from 'react-i18next';

interface ISaveModalProps {
    isModal: boolean;
    fnCallback: (action: string) => void
}

export const SaveModal = ({isModal, fnCallback}: ISaveModalProps) => {
    const {t} = useTranslation('common');

    return (
        <>
            <Modal
                className={s.modalContainer}
                open={isModal}
                onClose={() => fnCallback('close')}
            >
                <div className={s.modal}>
                    <h3>{t('modalSave.description')}</h3>
                    <p>{t('modalSave.question')}</p>
                    <button className={s.button}
                            onClick={() => fnCallback('close')}>{t('modalSave.close')}</button>
                    <button className={s.button}
                            onClick={() => fnCallback('permanent')}>{t('modalSave.permanent')}</button>
                    <NavLink to={'/SignInPage'}>
                        <button className={s.button}>{t('modalSave.login')}</button>
                    </NavLink>
                </div>
            </Modal>
        </>
    )

}