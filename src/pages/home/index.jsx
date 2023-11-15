import { useTranslation } from 'react-i18next';
import styles from './index.module.less';

const Home = () => {
  const {t} = useTranslation()
  return (
    <div>
      <h2 className={styles.home}>Home</h2>
      <p>{t('welcome.title')}</p>
    </div>
  );
};

export default Home;