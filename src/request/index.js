import httpAccount from './http_account';
import httpBase from './http_base';


// 重试机制 请求
const HttpWrapper = (url, options, requset_name) => {
  let request = httpBase;
  switch (requset_name) {
    case 'httpAccount':
      request = httpAccount;
    default:
      break;
  }
  return new Promise(async (resolve) => {
    const NUMBER_OF_ATTEMPTS = 3;
    const TIMEOUT_MILLIS = 10000;
    let retriesCount = 1;

    async function fetchWrapper() {
      let timeStamp1 = (new Date()).getTime();
      const {err, data, retry} = await request(url, options);
      // 当前只对错误对请求都执行重试机制 在全局拦截器可配置 根据code码等特定的条件返回执行 重试机制
      if (retry) {
        console.log('重试次数:', NUMBER_OF_ATTEMPTS - retriesCount);
        if (retriesCount < NUMBER_OF_ATTEMPTS) {
          let timeStamp2 = (new Date()).getTime();
          // console.group(timeStamp2, timeStamp1);
          let delay = (timeStamp2 < timeStamp1 + TIMEOUT_MILLIS) ? timeStamp1 + TIMEOUT_MILLIS - timeStamp2 : 0;
          setTimeout(fetchWrapper, delay);
          // console.groupEnd(timeStamp2, timeStamp1);
          retriesCount++;
          return;
        }
        return resolve({err, data});
      } else {
        console.log('重试结束');
        return resolve({err, data});
      }
      // return resolve(data);
    }

    fetchWrapper();
  });
};
export default HttpWrapper;