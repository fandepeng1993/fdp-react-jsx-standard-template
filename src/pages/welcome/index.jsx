import {useTranslation} from 'react-i18next';
import i18next from 'i18next';
import styles from './index.module.less'
const Welcome = () => {
  const {t} = useTranslation();
  const changeLng = (lng) => {
    i18next.changeLanguage(lng);
  };
  return (
    <div>
      <h2 className={styles.welcome}>Welcome</h2>
      <div>{t('AppName')}</div>
      <div>{t('welcome.title')}</div>
      <button onClick={() => {changeLng('zh-CN');}}>中文</button>
      <button onClick={() => {changeLng('en-US');}}>English</button>
    </div>
  );
};

export default Welcome;