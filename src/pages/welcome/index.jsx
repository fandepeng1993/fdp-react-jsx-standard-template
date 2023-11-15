import {useTranslation} from 'react-i18next';
import styles from './index.module.less'
import { useDispatch } from 'react-redux';
import { SETTINGS } from '../../store/actions';
const Welcome = () => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const changeLng = async (lng) => {
    // i18next.changeLanguage(lng);
    await dispatch({type: SETTINGS.CHANGELANGUAGE, payload: lng})
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