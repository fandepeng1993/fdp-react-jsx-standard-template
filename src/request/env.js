// 防止项目需要调用多个其他微服务接口 接口变量
const ENV = {
  BASE_URL: {
    dev: 'https://jsonplaceholder.typicode.com',
    test: 'https://jsonplaceholder.typicode.com',
    live: 'https://jsonplaceholder.typicode.com'
  },
  ACCOUNT_URL: {
    dev: 'https://jsonplaceholder.typicode.com',
    test: 'https://jsonplaceholder.typicode.com',
    live: 'https://jsonplaceholder.typicode.com'
  }
};


const env = process.env.REACT_APP_ENV;
console.log('当前环境：',env);

const SERVERURL = {
  BASE_URL: ENV.BASE_URL[env],
  ACCOUNT_URL: ENV.ACCOUNT_URL[env]
};
export default SERVERURL;