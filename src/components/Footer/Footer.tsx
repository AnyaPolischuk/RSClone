import s from './Footer.module.css';

import github from '../../assets/image/github.png';
import rsLogo from '../../assets/image/rs_logo.svg';

export const Footer = () => {
  return (
    <footer className={s.footer}>
      <a href='https://rs.school/' className=''>
        <img src={rsLogo} alt='rs-logo' className={s.rsLogo} />
      </a>
      <div className={s.footerYear}>
        <p className={s.year}>2023</p>
      </div>
      <div className={s.githubsWrapper}>
        <a href='https://github.com/AnyaPolischuk'>
          <img src={github} alt='github-logo' className={s.footerGithub} />
        </a>
        <a href='https://github.com/HKudria' className=''>
          <img src={github} alt='github-logo' className={s.footerGithub} />
        </a>
        <a href='https://github.com/Sekler09'>
          <img src={github} alt='github-logo' className={s.footerGithub} />
        </a>
      </div>
    </footer>
  );
};
