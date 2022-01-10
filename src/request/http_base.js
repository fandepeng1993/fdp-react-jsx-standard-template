import createFetchClient from './request';
import SERVERURL from './env';
import {isHttpUrl} from '@/utils/index';


// 基础 base 请求 针对 web端需要调用不同端后台服务端口
const httpAccount = createFetchClient();
httpAccount.interceptors.request.use((url, options) => {
  console.log('基础业务 服务 局部局请求拦截器:', url);
  let newUrl = isHttpUrl(url) ? url : `${SERVERURL.BASE_URL}${url}`;
  return {url: newUrl, options};
}, {global: false});
httpAccount.interceptors.response.use((response, optionss) => {
  return response;
}, {global: false});
export default httpAccount;