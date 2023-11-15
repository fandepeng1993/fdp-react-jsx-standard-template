import {Outlet, useResolvedPath, useParams, useLocation, Link, useNavigate} from 'react-router-dom';
import {Layout,Dropdown,Menu,Space,Avatar,Typography} from 'antd';
import {useDispatch, useSelector} from "react-redux";
import {useTranslation} from "react-i18next";
import styles from './index.module.less';
import { SETTINGS } from '../../store/actions';
const { Header, Content, Sider } = Layout;
const {Text} = Typography;


const defaultLangUConfigMap = {
  'en-US': {
      lang: 'en-US',
      label: 'English',
      icon: '🇺🇸',
      title: 'Language'
  },
  'zh-CN': {
      lang: 'zh-CN',
      label: '简体中文',
      icon: '🇨🇳',
      title: '语言'
  }
};
const LayoutPage = (props) => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {t} = useTranslation();
    const {userInfo, settings} = useSelector(state => state);
    const {language} = settings;

    const handleClickLang = async ({key}) => {
      await dispatch({type: SETTINGS.CHANGELANGUAGE, payload: key})
    };
  return (
    <>
      <Layout style={{width:'100%',height:'100%'}}>
        <Header className={styles.header}>
          <div className={styles.logo}/>
          <div className={styles.userbox}>
          <Dropdown 
            overlay={
                <Menu
                    selectedKeys={[language]} onClick={handleClickLang}
                    style={{minWidth: '160px'}}
                    items={
                        [
                            {key:"zh-CN",label:<><span role='img' aria-label={defaultLangUConfigMap['zh-CN']?.label || 'zh-CN'}>{defaultLangUConfigMap['zh-CN']?.icon || "🌐"}</span>{' '}{defaultLangUConfigMap['zh-CN']?.label || 'zh-CN'}</>},
                            {key:"en-US",label:<><span role='img' aria-label={defaultLangUConfigMap['en-US']?.label || 'en-US'}>{defaultLangUConfigMap['en-US']?.icon || "🌐"}</span>{' '}{defaultLangUConfigMap['en-US']?.label || 'en-US'}</>}
                        ]
                    }
                >
                </Menu>
            } 
            placement="bottom">
                <span className={styles.language}>
                <i className="zulerActicon">
                  <svg
                      viewBox="0 0 24 24"
                      focusable="false"
                      width="1em"
                      height="1em"
                      fill="currentColor"
                      aria-hidden="true"
                  >
                    <path d="M0 0h24v24H0z" fill="none"/>
                    <path
                        d="M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z "
                    />
                  </svg>
                </i>
              </span>
            </Dropdown>
            <Dropdown
                placement="bottomRight"
                style={{height:'50px'}}
                overlay={
                    <Menu
                        style={{textAlign: 'center'}}
                        onClick={()=>{}}
                        items={[
                            {key:'logout',label:"退出登录"},
                            {key:'personal',label:<Link to="/personal">个人中心</Link>}
                        ]}
                    >
                    </Menu>
                }
            >
                <div className={styles.userIcon}>
                    <Space className={styles.space}>
                        {
                            <Avatar  style={{backgroundColor: '#f56a00'}} ></Avatar>
                        }
                        <Text style={{width: 80}} ellipsis type="success">{'11111111'}</Text>
                    </Space>
                </div>
            </Dropdown>
          </div>
        </Header>
        <Layout hasSider className={styles.slider}>
          <Sider>

          </Sider>
          <Content>
            <Outlet />
          </Content>
        </Layout>
      </Layout>
      
    </>

  );
};
export default LayoutPage;