import s from './InfoPage.module.css';
import artemii from '../../assets/image/artemii.jpg'
import anna from '../../assets/image/anna.jfif'
import herman from '../../assets/image/herman.jfif'
import { useTranslation } from 'react-i18next';

export const InfoPage = () => {
  const { t } = useTranslation('common');
  return (
    <div>
      <div className={s.created}>
        <p>
          {t('infoPage.created')}
          <a href='#collaborators' className={s.link}>
            {t('infoPage.people')}
          </a>
          .
        </p>
        <p>{t('infoPage.RSS')}</p>
        <p>{t('infoPage.launched')}</p>
      </div>
      <div className={s.projectInfo}>
        <div>
          <p>{t('infoPage.about')}</p>
          <p>
            {t('infoPage.aboutText')}
          </p>
        </div>
        <div>
          <p>{t('infoPage.results')}</p>
          <p>
          {t('infoPage.resultsText')}
          </p>
        </div>
        <div id='collaborators' className={s.collaborators} >
          <p>{t('infoPage.collaborators')}</p>
          <ul className={s.collaboratorsList}>
            <li className={s.collaborator}>
              <img src={anna} alt='Anna' />
              <div className={s.collaboratorInfo}>
                <p>Anna Polishuk</p>
                <p>Team Lead,frontend developer</p>
              </div>
            </li>
            <li className={s.collaborator}>
              <img src={herman} alt='Herman' />
              <div className={s.collaboratorInfo}>
                <p>Herman Kudira</p>
                <p>Full-stack developer</p>
              </div>
            </li>
            <li className={s.collaborator}>
              <img src={artemii} alt='Artemii' />
              <div className={s.collaboratorInfo}>
                <p>Lipnitskiy Artemii</p>
                <p>Frontend developer</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
