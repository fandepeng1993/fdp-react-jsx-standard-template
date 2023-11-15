/**
 * 判断url是否携带http(s)
 * @param url
 * @returns {boolean}
 */
export const isHttpUrl = (url) => {
    // /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/;
    let reg = /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- ./?%&=]*)?/;
    return reg.test(url);
};


/* eslint no-useless-escape:0 import/prefer-default-export:0 */
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;
export const isUrl = path => reg.test(path);


/**
 * 邮箱校验
 * @param rule
 * @param value
 * @returns {boolean}
 */
export const mailValidFunction = (rule, value) => {
    // /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/
    if (value === null || value === '') return false;
    const re = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
    if (!(re.test(value))) {
        /* 请输入正确的手机号 */
        return true;
    }
    return false;
};


/* 手机号校验 */
export const phoneValidFunction = (rule, value) => {
    if (value === null || value === '') return false;
    const re = /^1[3456789]\d{9}$/;
    if (!(re.test(value))) {
        /* 请输入正确的手机号 */
        return true;
    }
    return false;
};

/* 校验密码校验：用户名7-16位 !@#$%^&*()\. */
export const passwordValidFunction = (rule, value) => {
    if (value === null || value === '') return false;
    const re = /^[a-zA-Z]([-_a-zA-Z0-9!@#$%^&*()\.]{6,15})$/;
    if (!(re.test(value))) {
        return true;
    }
    return false;
};
/* 校验登录名：用户名5-30位，只能数字字母下划线，字母开头 只能输入5-30个以字母开头、可带数字、“_@.” */
export const usernameValidFunction = (rule, value) => {
    if (value === null || value === '') return false;
    // !@#$%^&*()-_+=}{][|\\\\;:\\\"<>,./?
    const re = /^[a-zA-Z]{1}([a-zA-Z0-9]|[_@.]){4,29}$/;
    if (!(re.test(value))) {
        return true;
    }
    return false;
};

/* 校验英文 */
export const englishStringFunction = (rule, value) => {
    if (value === null || value === '') return false;
    const re = /^[A-Za-z]+$/; // /^[a-zA-Z]+$/
    if (!(re.test(value))) {
        return true;
    }
    return false;
};

// 对数字进行处理   每三位加逗号 和 保留几位小数
/**
 * @return {string}
 */
export function Money(value, num) {

    num = num > 0 && num <= 20 ? num : 2;

    value = `${parseFloat((`${value}`).replace(/[^\d\.-]/g, '')).toFixed(num)}`; // 将金额转成比如 123.45的字符串

    const valueArr = value.split('.')[0].split('');// 将字符串的数变成数组

    const valueFloat = value.split('.')[1]; // 取到 小数点后的值

    let valueString = '';

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < valueArr.length; i++) {
        valueString += valueArr[i] + ((i + 1) % 3 === 0 && (i + 1) !== valueArr.length ? ',' : ''); // 循环 取数值并在每三位加个','
    }
    // 拼接上小数位
    return `${valueString.split('').join('')}.${valueFloat}`;
}

// 取深度对象中的值
export const getDeepObj = (path, o) => path.reduce((prev, cur) => (prev && prev[cur]) ? prev[cur] : null, o);

/** 检验金额格式是否有误
 *  当前验证规则：不为负数、小数不可超过2位、金额数字为有效数字（如：1.2.1 为无效数）
 */
export function twoDecimalPlaces(rule, value) {
    if (value === null || value === '' || value === undefined) return false;
    const exp = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
    if (!(exp.test(value))) {
        return true;
    }
    if (nonNegative(rule, value)) return true;
    return false;
}

/**
 * 验证非负数
 */
export function nonNegative(rule, value) {
    if (value === null || value === '') return false;
    return value < 0;
}


// 校验经度
export function checkLong(rule, value) {
    if (value === null || value === '' || value === undefined) return false;
    const longrg = /^(\-|\+)?(((\d|[1-9]\d|1[0-7]\d|0{1,3})\.\d{0,6})|(\d|[1-9]\d|1[0-7]\d|0{1,3})|180\.0{0,6}|180)$/;
    return !longrg.test(value);
}

// 校验纬度是否符合规范
export function checkLat(rule, value) {
    if (value === null || value === '' || value === undefined) return false;
    const latreg = /^(\-|\+)?([0-8]?\d{1}\.\d{0,6}|90\.0{0,6}|[0-8]?\d{1}|90)$/;
    return !latreg.test(value);
}


// 校验zuler 9 位设备码
export function checkEquipmentId(rule, value) {
    if (value === null || value === '' || value === undefined) return false;
    const equidreg = /^\d{9}$/;
    return !equidreg.test(value);
}

// 校验zuler 6位设备临时密码
export function checkEquipmentPwd(rule, value) {
    if (value === null || value === '' || value === undefined) return false;
    const re = /^[\d]([\d]{5})$/;
    return !re.test(value);
}

/* 根据浏览器url后面的后缀 修改页面配置 */
/*export const getParameterByName = (name, config) => {
    // eslint-disable-next-line
    name = name.replace(/[\[]/, '\\\[').replace(/[\]]/, '\\\]');
    const regex = new RegExp(`[\\?&]${name}=([^&#]*)`);
    const results = regex.exec(location.search);
    let parameter = config[name];
    if (results !== null) {
        parameter = decodeURIComponent(results[1].replace(/\+/g, ' '));
        if (typeof config[name] === 'boolean') {
            parameter = !!parseInt(parameter, 0);
        }
    }
    return parameter;
};
export const fillInConfigFlagsFromParameters = (config) => {
    Object.keys(config).forEach((key) => {
        config[key] = getParameterByName(key, config);
    });
    console.log('Flags parsed, configuration is ', config);
};*/

// 进入全屏
export const fullScreen = (ele) => {
    if (isFullScreen() || !isFullscreenEnabled()) return;
    const elem = ele || document.documentElement || document.body;
    if (elem.requestFullscreen) {
        elem.requestFullscreen()
    } else if (elem.webkitRequestFullScreen) {
        if (window.navigator.userAgent.toUpperCase().indexOf('CHROME') >= 0) {
            elem.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT)
        } else {
            elem.webkitRequestFullScreen()
        }
    } else if (elem.mozRequestFullScreen) {
        elem.mozRequestFullScreen()
    } else if (ele.msRequestFullscreen) {
        ele.msRequestFullscreen();
    }
};

// exitFullScreen退出全屏
export const exitFullScreen = () => {
    if (!isFullScreen()) return;
    if (document.exitFullScreen) {
        document.exitFullScreen();
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    }
};

//判断当前是否全屏
export const isFullScreen = () => {
    return !!(
        document.fullscreen ||
        document.mozFullScreen ||
        document.webkitIsFullScreen ||
        document.webkitFullScreen ||
        document.msFullScreen
    );
};

// 判断当前文档是否能切换到全屏
export const isFullscreenEnabled = () => {
    return (
        document.fullscreenEnabled ||
        document.mozFullScreenEnabled ||
        document.webkitFullscreenEnabled ||
        document.msFullscreenEnabled
    );
};

//获取当前全屏的节点
export const getFullscreenElement = () => {
    return (
        document.fullscreenElement ||
        document.mozFullScreenElement ||
        document.msFullScreenElement ||
        document.webkitFullscreenElement || null
    );
};

// 输出badge
export const logBadge = (text1, text2, bg_color1, bg_color2, color1 = '#fff', color2 = '#fff') => {
    console.log(
        '%c '.concat(text1, ' %c ').concat(text2, ' '),
        'padding:1px;border-radius:3px 0 0 3px;color:'.concat(color1, ';').concat('background:'.concat(bg_color1, ';')),
        'padding:1px;border-radius:0 3px 3px 0 ;color:'.concat(color2, ';').concat('background:'.concat(bg_color2, ';'))
    );
};

// 输出版权
export const logCopyRight = () => {
    console.log(
        "%c %cDesktron",
        `line-height:55px;padding:0px 100px;background-image:url(https://www.todesk.com/image/index/logo.svg); background-repeat:no-repeat;background-size:143px 40px;`,
        `padding:0px 100px;
         vertical-align:text-bottom;
         text-align: justify;
         text-justify: auto;
         text-transform:capitalize;
         font-size:30px;
         line-height:90px;
         color:#fff;
         text-shadow: 0 1px 0 #ccc,0 2px 0 #c9c9c9,0 3px 0 #bbb,0 4px 0 #b9b9b9,0 5px 0 #aaa,0 6px 1px rgba(0,0,0,.1),0 0 5px rgba(0,0,0,.1),0 1px 3px rgba(0,0,0,.3),0 3px 5px rgba(0,0,0,.2),0 5px 10px rgba(0,0,0,.25),0 10px 10px rgba(0,0,0,.2),0 20px 20px rgba(0,0,0,.15);
         background: rgba(252,234,187,1);
         background: -moz-linear-gradient(left, rgba(252,234,187,1) 0%, rgba(175,250,77,1) 12%, rgba(0,247,49,1) 28%, rgba(0,210,247,1) 39%,rgba(0,189,247,1) 51%, rgba(133,108,217,1) 64%, rgba(177,0,247,1) 78%, rgba(247,0,189,1) 87%, rgba(245,22,52,1) 100%);
         background: -webkit-gradient(left top, right top, color-stop(0%, rgba(252,234,187,1)), color-stop(12%, rgba(175,250,77,1)), color-stop(28%, rgba(0,247,49,1)), color-stop(39%, rgba(0,210,247,1)), color-stop(51%, rgba(0,189,247,1)), color-stop(64%, rgba(133,108,217,1)), color-stop(78%, rgba(177,0,247,1)), color-stop(87%, rgba(247,0,189,1)), color-stop(100%, rgba(245,22,52,1)));
         background: -webkit-linear-gradient(left, rgba(252,234,187,1) 0%, rgba(175,250,77,1) 12%, rgba(0,247,49,1) 28%, rgba(0,210,247,1) 39%, rgba(0,189,247,1) 51%, rgba(133,108,217,1) 64%, rgba(177,0,247,1) 78%, rgba(247,0,189,1) 87%, rgba(245,22,52,1) 100%);background: -o-linear-gradient(left, rgba(252,234,187,1) 0%, rgba(175,250,77,1) 12%, rgba(0,247,49,1) 28%, rgba(0,210,247,1) 39%, rgba(0,189,247,1) 51%, rgba(133,108,217,1) 64%, rgba(177,0,247,1) 78%, rgba(247,0,189,1) 87%, rgba(245,22,52,1) 100%);
         background: -ms-linear-gradient(left, rgba(252,234,187,1) 0%, rgba(175,250,77,1) 12%, rgba(0,247,49,1) 28%, rgba(0,210,247,1) 39%, rgba(0,189,247,1) 51%, rgba(133,108,217,1) 64%, rgba(177,0,247,1) 78%, rgba(247,0,189,1) 87%, rgba(245,22,52,1) 100%);background: linear-gradient(to right, rgba(252,234,187,1) 0%, rgba(175,250,77,1) 12%, rgba(0,247,49,1) 28%, rgba(0,210,247,1) 39%, rgba(0,189,247,1) 51%, rgba(133,108,217,1) 64%, rgba(177,0,247,1) 78%, rgba(247,0,189,1) 87%, rgba(245,22,52,1) 100%);
         filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#fceabb', endColorstr='#f51634', GradientType=1 );`
    )
};

export const closePage = () => {
    if (navigator.userAgent.indexOf("Firefox") !== -1 || navigator.userAgent.indexOf("Chrome") !== -1) {
        window.location.href = "about:blank";
        window.close();
    } else {
        window.opener = null;
        window.open("", "_self");
        window.close();
    }
};

// 防抖
export const debounce = (fn, delay) => {
    let timer = null; //借助闭包
    return function (...args) {
        if (timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(()=>{fn.apply(null,args)}, delay) // 简化写法
    }
};

// 节流
export const throttle = (fn, delay) => {
    let valid = true;
    return function (...args) {
        if (!valid) {
            //休息时间 暂不接客
            return false
        }
        // 工作时间，执行函数并且在间隔期内把状态位设为无效
        valid = false;
        setTimeout(() => {
            fn.apply(null,args);
            valid = true;
        }, delay)
    }
};

// 判断浏览器内核
//返回浏览器的类型: "ie", "firefox", "chrome", "opera", "safari", "unknow"
export const getBrowser  = (getVersion)=>{
    // 注意关键字大小写
    var ua_str = navigator.userAgent.toLowerCase(), ie_Tridents, trident, match_str, ie_aer_rv, browser_chi_Type;
    // 判断IE 浏览器,
    if("ActiveXObject" in self){
        // ie_aer_rv:  指示IE 的版本.
        // It can be affected by the current document mode of IE.
        ie_aer_rv= (match_str = ua_str.match(/msie ([\d.]+)/)) ?match_str[1] :
              (match_str = ua_str.match(/rv:([\d.]+)/)) ?match_str[1] : 0;

        // ie: Indicate the really version of current IE browser.
        ie_Tridents = {"trident/7.0": 11, "trident/6.0": 10, "trident/5.0": 9, "trident/4.0": 8};
        //匹配 ie8, ie11, edge
        trident = (match_str = ua_str.match(/(trident\/[\d.]+|edge\/[\d.]+)/)) ?match_str[1] : undefined;
        browser_chi_Type = (ie_Tridents[trident] || ie_aer_rv) > 0 ? "ie" : undefined;
    }else{
        //判断 windows edge 浏览器
        // match_str[1]: 返回浏览器及版本号,如: "edge/13.10586"
        // match_str[1]: 返回版本号,如: "edge"
        //若要返回 "edge" 请把下行的 "ie" 换成 "edge"。 注意引号及冒号是英文状态下输入的
        browser_chi_Type = (match_str = ua_str.match(/edge\/([\d.]+)/)) ? "edge" :
                    //判断firefox 浏览器
                      (match_str = ua_str.match(/firefox\/([\d.]+)/)) ? "firefox" :
                    //判断chrome 浏览器
                      (match_str = ua_str.match(/chrome\/([\d.]+)/)) ? "chrome" :
                    //判断opera 浏览器
                      (match_str = ua_str.match(/opera.([\d.]+)/)) ? "opera" :
                    //判断safari 浏览器
                      (match_str = ua_str.match(/version\/([\d.]+).*safari/)) ? "safari" : undefined;
    }


    //返回浏览器类型和版本号

    var verNum, verStr;

    verNum = trident && ie_Tridents[trident] ? ie_Tridents[trident] : match_str[1];

    verStr = (getVersion !== undefined) ? browser_chi_Type+"/"+verNum : browser_chi_Type;
    return verStr;
 };


 /* 获取操作系统 */
 export const getOSname = () => {
    let e = "未知";
    if (window.navigator.userAgent.indexOf("Windows NT 10.0") !== -1)
        e = "Windows";
    if (window.navigator.userAgent.indexOf("Windows NT 6.2") !== -1)
        e = "Windows";
    if (window.navigator.userAgent.indexOf("Windows NT 6.1") !== -1)
        e = "Windows";
    if (window.navigator.userAgent.indexOf("Windows NT 6.0") !== -1)
        e = "Windows";
    if (window.navigator.userAgent.indexOf("Windows NT 5.1") !== -1)
        e = "Windows";
    if (window.navigator.userAgent.indexOf("Windows NT 5.0") !== -1)
        e = "Windows";
    if (window.navigator.userAgent.indexOf("Mac") !== -1)
        e = "Mac";
    if (window.navigator.userAgent.indexOf("X11") !== -1)
        e = "UNIX";
    if (window.navigator.userAgent.indexOf("Linux") !== -1)
        e = "Linux";
    return e
}