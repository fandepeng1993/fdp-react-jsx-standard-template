import i18n from 'i18next';
import backend from 'i18next-http-backend';

import {initReactI18next} from 'react-i18next';

const desktronLocal = localStorage.getItem('desktron');
const parseLocal = desktronLocal ? JSON.parse(desktronLocal) : "{}";
const parseSettings = parseLocal.settings ? JSON.parse(parseLocal.settings) : {language: 'zh-CN'};
const localLng = parseSettings.language;
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
  compatibilityJSON: 'v3',
  react: {
    // 是否需要在最外层加入Suspense标签
    useSuspense: false
  },
  backend: {
    // path where resources get loaded from, or a function
    // returning a path:
    // function(lngs, namespaces) { return customPath; }
    // the returned path will interpolate lng, ns if provided like giving a static path
    // the function might return a promise
    //
    // If allowMultiLoading is false, lngs and namespaces will have only one element each,
    // If allowMultiLoading is true, lngs and namespaces can have multiple elements
    loadPath: './locales/{{lng}}/{{ns}}.json',

    // path to post missing resources, or a function  
    // function(lng, namespace) { return customPath; }
    // the returned path will interpolate lng, ns if provided like giving a static path
    addPath: './locales/add/{{lng}}/{{ns}}',
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
  fallbackLng: localLng, // textLanguage.value,
  defaultNS: ['translation'],
  fallbackNS: false,
  lng: localLng,
  ns: 'translation',
  // keySeparator:true,
  interpolation: {
    escapeValue: false // not needed for react as it escapes by default
  }
});
export default i18n;