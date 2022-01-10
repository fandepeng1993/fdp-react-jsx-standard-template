import i18n from 'i18next';
import backend from 'i18next-http-backend';

import {initReactI18next} from 'react-i18next';

// const jlrLocal = localStorage.getItem('jlr');
// const parseLocal = jlrLocal?JSON.parse(jlrLocal):"{}";
// const parseSettings = parseLocal.settings? JSON.parse(parseLocal.settings):{language:'en-US'};
// const localLng = parseSettings.language;
/*
* .init({
        react: {
            // 是否需要在最外层加入Suspense标签
            useSuspense: false
        },
        initImmediate: true,
        languages:['en-US','zh-CN'],
        load: 'currentOnly',
        // load: 'currentOnly',
        // resources:{
        //     'en-US':{
        //         translations:{aaa:'dddddd'}
        //     },
        //     'zh-CN':{
        //         translations:{aaa:'eeeee'}
        //     }
        // },
        // lng: localLng,
        //选择默认语言，选择内容为上述配置中的key，即en/zh
        // fallbackLng: "zh-CN", "en-US"
        fallbackLng: localLng,
        defaultNS: ['translations'],
        fallbackNS: false,
        // partialBundledLanguages:true,
        ns: "translations",
        // debug: true,
        interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
        },
    });*/

i18n.use(backend).use(initReactI18next).init({
  react: {
    // 是否需要在最外层加入Suspense标签
    useSuspense: false
  },
  initImmediate: true,
  languages: ['en-US', 'zh-CN'],
  load: 'currentOnly',

  // load: 'currentOnly',
  // resources:{
  //     'en-US':{
  //         translations:{aaa:'dddddd'}
  //     },
  //     'zh-CN':{
  //         translations:{aaa:'eeeee'}
  //     }
  // },
  // lng: localLng,
  //选择默认语言，选择内容为上述配置中的key，即en-US/zh-CN
  // fallbackLng: "zh-CN", "en-US"
  fallbackLng: 'zh-CN', // textLanguage.value,
  defaultNS: ['translation'],
  fallbackNS: false,
  lng: 'zh-CN',
  ns: 'translation',
  // keySeparator:true,
  interpolation: {
    escapeValue: false // not needed for react as it escapes by default
  }
});
export default i18n;