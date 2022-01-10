import createFetchClient from './request';
import SERVERURL from './env';
import {isHttpUrl} from '@/utils/index';


// 基础 base 请求 针对 web端需要调用不同端后台服务端口
const httpBase = createFetchClient();
httpBase.interceptors.request.use((url, options) => {
  console.log('ACCOUNT 微服务 局部局请求拦截器:', url);
  let newUrl = isHttpUrl(url) ? url : `${SERVERURL.ACCOUNT_URL}${url}`;
  return {url: newUrl, options};
}, {global: false});
httpBase.interceptors.response.use((response, optionss) => {
  return response;
}, {global: false});
export default httpBase;