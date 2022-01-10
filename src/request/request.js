import Request, {extend} from 'umi-request';

const codeMap = {
  // http 状态码
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  402: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  405: '请求方法不被允许。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
  // 业务状态码
  40005: '服务器端自定义错误码'
};

// 请求重试code码
const retryCodes = [401, 402, 404, 40005];

// 全局请求拦截器
Request.interceptors.request.use((url, options) => {
  console.log('全局请求拦截器:', url);
  return {url, options};
}, {global: true});


// 全局响应拦截器
Request.interceptors.response.use(async (response, options) => {
  // 如果没有返回响应
  if (!response) return Promise.resolve({err: true});
  const {
    status
  } = response;

  //得确认是根据http状态码来 做重试 还是 服务响应的code码
  const resData = await response.clone().json();
  console.log('resData', resData);
  // 如果http状态为200;
  if (status === 200) {
    // 如果返回内容为空
    if (!resData) {
      return Promise.resolve({err: true});
    }
    const {code} = resData; // 对接口返回对code码进行 判断 对特定对code码执行retry 机制
    if (!code) {
      return Promise.resolve({data: resData});
    }
    if (code === 200 || code === 0) {
      return Promise.resolve({data: resData});
    } else if (retryCodes.includes(code)) {
      // 执行重试机制
      console.log('进入->业务执行执行重试机制');
      return Promise.resolve({retry: true, err: resData});
    } else {
      // http 状态ok 服务code码异常 抛出异常进入全局错误ErrorHandler
      return Promise.reject({data: resData, response});
    }
  }

  // http协议错误重试机制
  if (retryCodes.includes(status)) {
    // 执行重试机制
    console.log('进入->http执行重试机制');
    return Promise.resolve({retry: true, err: resData || true});
  }
  // http 状态报错 return response; 进入全局错误ErrorHandler
  return Promise.reject({data: null, response});
}, {global: true});


// 'errorHandler' 统一的异常处理，Response 没有 return 供开发者对请求发生的异常做统一处理 对HTTP请求对code码进行处理抛出异常。
const errorHandler = (error) => {
  const {response, data} = error; //request
  // console.log('error===>', error);
  console.dir(error);
  let errorCode = data?.code || response.status;
  let errorMsg = codeMap[errorCode] || error.message || '未知错误';
  console.log(errorMsg);
  // return;
  // 如果throw. 错误将继续抛出.
  // throw error;
  // 如果return, 则将值作为返回. 'return;' 相当于return undefined, 在处理结果时判断response是否有值即可.
  return Promise.resolve({err: true}); // data

};

const createClient = (options = {}) => {
  // 创建默认实例
  return extend({
    timeout: 0,
    // 'credentials' 发送带凭据的请求
    // 为了让浏览器发送包含凭据的请求（即使是跨域源），需要设置 credentials: 'include'
    // 如果只想在请求URL与调用脚本位于同一起源处时发送凭据，请添加credentials: 'same-origin'
    // 要改为确保浏览器不在请求中包含凭据，请使用credentials: 'omit'
    credentials: 'same-origin', // default
    errorHandler,
    options: {...options}

  });
};

export default createClient;
